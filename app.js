const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//import the sequelize object thay vì db chứa data connection pool như trước kia
//const db=require('./util/database'); // the pool which allows us to use a connection in it
const sequelize = require('./util/database');

//before I sync all my data to the database, I want to import my models
const Product=require('./models/product');
const User=require('./models/user'); //khi npm start, thì sequelize.sync() sẽ tạo bảng tương ứng cùng các mối liên kết
const Cart=require('./models/cart');
const CartItem=require('./models/cart-item');
const Order=require('./models/order');
const OrderItem=require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

let count=0;
app.all('*', function(req, res, next){
    //count += 1;  => TypeError: Assignment to constant variable. vì đã const count=0;
    //cho dù đường dẫn làm "Page not found" cũng matches với * 
    count+=1;
    console.log("giá trị count: \n",count);
    //Choice 1 (recommended):
        next(); //giúp anh em sinh đôi app.use(  (req,res,next) được chạy luôn dù URL giống nhau
    //Choice 2:
        ///res.send("I am done with *"); //kết thúc req-res cycle  ở đây, tất cả các route phía sau sẽ không chạy
    
});



  //ý nghĩa tương tự trên:
//cô hanhtran có nói quy tắc định nghĩa route trên server là: Các routes khác nhau phải là định danh DUY NHẤT
   /// Như vậy app.all('*') xuất hiện cùng lúc với app.use(  (req,res,next) =>{}) sẽ làm cho the second không chạy được? Vì control xử lý route nào gần nhất từ trên xuống dưới
   /// Khi thí nghiệm gửi GET '/' thì cả 2 middleware trên cùng chạy, lý do là anh "*" có chữ next() 
app.use(  (req,res,next) => { //không có GET/POST + route được cài đặt tường minh/rõ ràng thông thường bởi app.post('route',(req,res,next)=>{}) 
    //Mục tiêu: register a new middleware because I want to store that user in my request so that I can use it from anywhere in my app conveniently.
    //WHEN? hàm middleware này chỉ chạy được khi có bất cứ yêu cầu GET POST PUT DELETE PATCH nào, khi đó xử lý (req)=> sẽ luôn có biến req.user = user
        ///  VD yêu cầu GET http://localhost:3003/, GET http://localhost:3003/admin/add-product , postAddProduct
    //want to reach out to my database and retrieve my user with user findByPk().

    //for an incoming request, we will then execute this function (req,res,next)=>{}
    //Chú ý:  incoming requests are ONLY funneled through our middleware
       /// npm start runs sequelize.sync() chứ không chạy các hàm nhận incoming req bên trong app.use
       /// it just registers it as middleware for incoming requests. So,  this code will only run for incoming requests which on the other hand can only reach this if we did successfully start our server here with app listen
           //// vị trí của app.listen() lúc này , we are guaranteed to find a user here
    User.findByPk(1)
       //do findByPk() trả về 1 Promise nên sau một thời gian dài xử lý, giá trị hàm trả về là 1 user model instance được wrapped trong Promise.resolve(user) và user sẽ là tham số của hàm anynomous trong then() tiếp theo
       //hàm trên đã thay thế câu SQL sau không có cơ hội có mặt ở đây: SELECT * FROM users as 'user' WHERE user.id = 1
       .then(
           user=>{
               //thử truy xuất giá trị của javascript object user xem nó có đơn giản chứa các giá trị trong CSDL không
               //Cây trả lời là :  keep in mind the user we're retrieving from the database here is not just a javascript object with the values stored in a database,
                  ///it's a sequelize object with the value stored in the database and with all these utility methods sequelize added, like destroy.
                  /// we're storing this sequelize object here in the request and not just a javascript object with the field values
                  /// therefore whenever we call req.user in the future in our app, we can also execute methods like destroy.
               console.log("giá trị của model instance user sẽ không chỉ có đối tượng nhận được, nên gọi user là Sequelize object with magic sequelize features: \n",user); //sẽ không chạy sau khi npm start vì Express app đang listen for req, chưa có req nào tới hết
               //sync().then().then().catch() cho phép đảm bảo luôn có 1 user available trong CSDL
               //do đó this fulfilled Promise sẽ luôn tìm thấy user, nên không xét if(!user) ở đây 
               
               
               
               req.user=user; //vì sao user.save() thì ok, còn req.user không có suggest save() ??
               
               
               
               
               console.log("nội dung của req.user: \n",req.user);
               //we can simply add a NEW field to our request object,we should just make sure we don't overwrite an existing one, like req.body trong trường hợp có POST hay PUT request tới app
               //trong req object thì biến req.user mặc định thuộc type undefined (lý do là nó chưa hề tồn tại trên bộ nhớ)
               //now I'm storing the user I retrieved from the database in there, giúp cho req.user được khai báo và khác null (do mang địa chỉ trỏ tới model instance user)
               // if we get our user and stored it, continue with next()
               next(); //clever!!! next() giúp program control chạy tiếp và nếu phát hiện đường dẫn cụ thể matching thì sẽ xử lý luôn!! VD http://localhost:3001/admin/products thì cả 3 routes sau đều có handler chạy là: '*' =next()=> app.use(  (req,res,next) => {}) => app.use(/admin,adminRouter)+router.get('/products', adminController.getProducts);
               
               //ok, sử dụng tham số next để chủ động chuyển tới app.use()/app.post()/app.get()/... tiếp theo. Câu hỏi là nếu có err có catch(err) không, thì câu trả lời là có vì req-res cycle của middleware này chưa kết thúc, muốn skip luôn cycle này thì để next(); return; 
               //https://stackoverflow.com/questions/13133071/express-next-function-what-is-it-really-for 
               // we've got the user set up and retrieved, now make sure that we can also use it to create new products that are associated to that user.
           }
       )
       //Mặc dù lệnh next() tới route kế tiếp, nhưng nếu có err thì vẫn catch(err)
       .catch(err=>console.log(err)); //err != null , log() sẽ truy cập giá trị của biến đối tượng err
})


//vì sao tác giả luôn dùng app.use() để phối hợp router.get/post()
app.use('/admin', adminRoutes);
app.use(shopRoutes);
//lần đầu tiên trong app.js dùng app.get để trả về Chuoi_JSON, theo bài giảng cô hanhtran
app.get('/json',function(req,res){
    var json={
        name:'ben',
        age:10
    };
    res.json(json); //{"name":"ben","age":10}
});
app.get('/html',function(req,res){
   //res.sendFile(__dirname+"/test.html"); => error:Error: ENOENT: no such file or directory, stat 'D:\KHOA_5_BACKEND1\Đồ án, Exercises, Labs, Final\Thực hành VSCode\NJS101x_Lab5.19Cach2_khanglvfx15073@funix.edu.vn\test.html'
   //Có error như trên, sao không nhảy tới app.use(errorController.get404); để trả lời "Page Not Found"?
       /// lý do là chỉ các route nào mà không matches tất cả các routes từ trên xuống /html là cuối dùng, VD http://localhost:3001/HTML sẽ không match route nào hết, lúc đó báo lỗi
    res.sendFile(__dirname+"/data/test.html")
    
});

app.get('/lay_chuoi',function(req,res){
    res.send("Gửi chuỗi");
})

//Request-Response cycle
    ///https://stackoverflow.com/questions/10695629/what-is-the-parameter-next-used-for-in-express

        ////VD1
app.get('/dinosaur', function (req, res, next) {
    res.send("Hello World !!!!"); //completed req-res cycle
});
      
app.get('/dinosaur', function (req, res, next) {
    res.send("Hello Planet !!!!");//completed req-res cycle
});
        //// VD2 
app.get('/skip', function (req, res, next) {
    if(1===1){
        next();
        return; // while imcompleted req-res cycle here, skip the first middleware function if the condition is true and invoke the next middleware function 
        res.send("Please print this, do not skip! ") //Unreachable code detected
    }
    res.send("Hello World !!!!");  
});
          
app.get('/skip', function (req, res, next) {
    res.send("Hello Planet !!!!");
});

        ////VD3
app.get('/WANT_BOTH', function (req, res, next) {
    // Your piece of logic
    console.log("alo, 1234?");
    next();// need both the middleware functions to be invoked (không muốn req-res cycle kết thúc tại đây). So, the only way you reach the second middleware function is by calling next();
});
          
app.get('/WANT_BOTH', function (req, res, next) {
    res.send("Hello !!!!");
});

        ////VD4 
app.get('/AFTER_NEXT',function(req,res,next){
    console.log("alo, 456?");
    next();
    console.log("alo, 789");
    //incomplete req-res cycle, no skip here
})

app.get('/AFTER_NEXT',function(req,res,next){
    res.send("program control is HERE !!");
})

//bài giảng hanhtran, Regular Expression in Route
   /// trong route có dấu + ? *  theo dạng công thức
      /// Problem phát sinh là: nếu ta thực sự muốn định nghĩa route có app.use('/ab*cd',handler) và muốn tới http://localhost:3001/ab*cd (Sẽ gắp Page Not Found) chứ không muốn tới các route có dạng công thức
   ///route cũng có thể được định nghĩa là 1 regular expression cho phép định nghĩa một nhóm các đường dẫn URL có chung một công thức nào đó 
app.get('/ab?cd',function(req,res){
    //ý nghĩa của route này là ký tự trước ? (là b) có hay không có cũng được
       /// do đó chấp nhận các nhóm đường dẫn như /abcd , /acd đều thỏa mãn định nghĩa /ab?cd
       /// Important note: nếu ghi http://localhost:3001/ab?cd  sẽ gặp "Page Not Found"
       /// http://localhost:3001/abcd   WORK!! 
       /// http://localhost:3001/acd   WORK!!
       /// http://localhost:3001/accdd  NOT WORK!! sẽ thông báo lỗi không trả lời được req này : CANNOT GET / abcd 
       ///nghĩa là tất cả req mà client gửi lên server chỉ được xử lý khi server có đường dẫn định nghĩa sẵn tương ứng
    res.send("/ab?cd");
});   

// ab+cd thì trước dấu + (là b) có thể lặp nhiều lần như abcd abbcd. Quy tắc là bắt buộc b phải xuất hiện ít nhất 1 lần
   ///Important note: nếu ghi http://localhost:3001/ab+cd  sẽ gặp "Page Not Found"
   /// http://localhost:3001/abcd sẽ trả về /ab?cd  bởi vì app.get('/ab?cd', handler) đứng trước trong middleware stack 
   /// http://localhost:3001/abbbbcd trả về /ab+cd
   /// http://localhost:3001/acd sẽ trả về /ab?cd , nếu không có middleware bên trên thì sẽ "Page Not Found" cho đường dẫn này
app.get('/ab+cd',function(req,res){
    res.send("/ab+cd");
})

//ab*cd thì * có ý nghĩa ký tự gì cũng được (ở giữa b và c ) và bắt buộc kết thúc bằng cd 
   /// URL ab*cd => abRANDOMcd 
app.get('ab*cd',function(req,res){
    res.send("ab*cd.Amazing??");
}) //http://localhost:3001/abRANDOMcd hay http://localhost:3001/ab*cd => Page not found

//http://localhost:3001/abRANDfeewfefewOMc  không kết thúc bằng cd nên "Page not found"
//http://localhost:3001/aRANDfeewfefewOMc không kết thúc bằng ab nên "Page not found"
//  URL  /abRANDfeewfefewOMcd =>ok
// URL  http://localhost:3001/ab*cd  => ok , vừa có console.log("The first /ab*cd"); vừa có res.send("The second /ab*cd");
// URL http://localhost:3001/abFEHUEFcd => có console.log("The first /ab*cd"); nhưng next() sẽ không tìm được matching route nữa, tới app.use(errorController.get404); thì được tiếp nhận và trả về "Page Not Found!"
app.get('/ab*cd',function(req,res,next){
    console.log("The first /ab*cd");
    next(); //Không có tham số next thì ReferenceError: next is not defined
}) 
//theo bài giảng cô hanhtran, giả sử Express xem URL  http://localhost:3001/ab*cd  => NOT ok thì:
app.get('/ab([*])cd',function(req,res){
    res.send("The second /ab*cd");
})//Kết luận: không cần thiết ([*])

//Trường hợp người dùng truy xuất tới đường dẫn không tồn tại trên những đường dẫn định nghĩa trước trên server, thì 
//quy tắc là đi từ top tới bottom khi execution, khi không còn middleware nào mà vẫn yêu cầu thì báo lỗi 404 ở dòng cuối cùng
app.use(errorController.get404);


//tell Association between 2 models for Sequelize
//we are now setting up a One_to_Many association for sequelize

//Khi npm start, thì không có request nào tới, nên control sẽ đọc những dòng sau trước các middleware
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})  // onUpdate="CASCADE" là mặc định không cần ghi
//Ý NGHĨA: one/a Product only BELONGS TO ONE/a User and automatically add userId vào bảng SANPHAMs
//Ý nghĩa chiều ngược lại: A User can also own multiple Products hay own 1 Product only (User.hasMany(Product) hoặc User.hasOne(Product)). 
     ///https://sequelize.org/docs/v6/core-concepts/assocs/ nói belongsTo là mặc định hiểu mối quan hệ phải là 1:1 nên không cần ghi  User.hasOne(Product) . Hover lên "belongsTo" sẽ thấy dòng "target model User is associated with the hasOne relationship"
     /// Muốn có quan hệ 1:N thì Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'}) kết hợp User.hasMany(Product);

//có thể làm mối liên kết thêm rõ ràng hơn. Bạn ontional thêm vào: because one user can of course add more than one product to the shop.
User.hasMany(Product); //this is OPTIONAL, you don't need that. Cũng tương tự có thể thay thế Product.belongsTo(User) bằng User.hasMany(Product). I also like to define both directions to really make it clear how this relation works.
User.hasOne(Cart); //basically the inverse of this relation and it's optional (vì chỉ cần belongsTo thôi là mang nghĩa Association 1-1). you don't need to add it, a one direction is enough.
Cart.belongsTo(User);
//Nói chung , belongsTo is basically the inverse of this relation hasOne , nên optional thêm nó vô, một trong hai là đủ ý nghĩa 1-1 Association
//các vị trí sau sẽ add a key (a new field to the cart which is the user id to which the cart belongs.) to TARGET Cart:  hasOne(Cart) , Cart.belongsTo(User)

//Many-to-Many relationship: because one cart can hold multiple products and a single product can be part of multiple different carts.
Cart.belongsToMany(Product, {through:CartItem}); //"through" keep telling sequelize where these connection should be stored and that is my CartItem model. we use that to tell sequelize which model to use as the in between models and therefore as the in-between table,
Product.belongsToMany(Cart,{through:CartItem}); //optional

//Điều này giải thích vì sao tui tạo ra Model Class Cart-Item :
    /// Vì mối N-M can ONLY works with an INTERMEDIATE table that connects them which basically stores a combination of product IDs and cart IDs

//Gặp lại One-To-Many relationship (như mối quan hệ B2C )
//single order is always belonging to one user who placed the order
Order.belongsTo(User); //nếu chưa import hay export class Order thì chữ Order màu đỏ, còn User màu cam do đã import 
User.hasMany(Order);

//Many-To-Many Association, by default  the name of the join table is source+target, hence OrderItem
Order.belongsToMany(Product,{through:OrderItem}); //a through model which is to join source and target in n:m associations
//Product.belongsToMany(Order,{through:OrderItem})  //optional





/*
   // Câu hỏi cho Mentor
       Nếu viết cách Product.belongsTo(User) thì khó nhận ra là 1:N hay 1:1 , vậy e có nên thêm thông tin là User.hasOne(Product) hay User.hasMany(Product)

   //Mentor đáp:  

   ** Mentor : https://sequelize.org/docs/v6/core-concepts/assocs/
        *** The A.belongsTo(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the source model (A).
        *** 1:1
        *** vậy A.belongsTo(B) là có mặc định B.hasOne(A)
        *** MUỐN THAY ĐỔI MẶC ĐỊNH thì A.belongsTo(B) kết hợp B.hasMany(A)

*/


//{constraints:true,onDelete:'CASCADE'} nghĩa là cho phép các constraints như onUpdate:'CASCADE' và onDelete:'CASCADE' xuất hiện , Do bảng Product đang nắm giữ UserID, nên  if a user is deleted, what should happen to any connected products?we can say cascade which simply means well the deletion would then also be executed for the product, so if we delete a user, any product related to the user would also be gone
   /// onDelete có thể có 2 giá trị là 'CASCADE' hay 'SET NULL'
//Ý nghĩa tương tự: Comment.belongsTo(Visitor) và Visitor.hasMany(Comment) nghĩa là mối liên kết 1-To-Many; Visitor là PK table, còn Comment sẽ là FK thông qua VisitorID
  
/*
    *** A User can also own multiple Products
    *** chú ý ý nghĩa: own không phải bought it, mà là  in the sense of hey I offer this product, I created it in the shop.
    *** talking about a user created this product,we're not talking about purchases at this point
*/
/*
   //this will add UserId to "Product" table
   //targeted User is the model that may be associated with hasOne relationship 
   //We can also configure this by passing a second argument which is optional Javascript object for association
*/
/*
   Sequelize provides four types of associations that should be combined to create them:

   The hasOne association
   The hasMany association
   The belongsTo association
   The belongsToMany association
 */

/*
const A = sequelize.define('A', ... );
const B = sequelize.define('B',  ... );

A.hasOne(B); // A HasOne B
A.belongsTo(B); // A BelongsTo B
A.hasMany(B); // A HasMany B
A.belongsToMany(B, { through: 'C' }); // A BelongsToMany B through the junction table C

*/



//2 nhiệm vụ của sequelize.sync() là:
    ///Mission1: sync all defined models to database (by creating the appropriate tables)--> Đọc hết các models rồi tạo bảng tương ứng trên MySQL  
    ///Mission2: đọc code association để define the relations in our database 
//.then() listens to the result of this ( what we get back as a response )
   /// lý do dùng then() là hover lên sync() sẽ thấy sync trả về Promise
//.catch() potential errors if there

//Problem:The one problem we have right now is that we already created the products table and therefore will not override it with the new information
   //Solution: we can ensure that it will by setting force to true.
   //Nhược điểm của force:true là  a setting you wouldn't really use in production because you don't always want to overwrite your tables all the time
        ///but here during development, I want to reflect my new changes so I'll set this to true and therefore after restarting, we indeed see a couple of statements were executed.
        ///Sau khi npm start, thấy trên console
        /// Bước 1: chạy các lệnh SQL là DROP TABLE IF EXISTS `SANPHAMs` ; DROP TABLE IF EXISTS `users`  nghĩa là sequelize đọc các models và sẽ xóa any existing tables trong CSDL  
        /// Bước 2: CREATE TABLE IF NOT EXISTS `SANPHAMs`; CREATE TABLE IF NOT EXISTS `users`; 
            //// với các auto created attributes bởi Database engine InnoDB như id, createdAt, updatedAt 
            //// trong bảng `users` thì PRIMARY KEY (`id`); 
            //// Product.belongsTo(User) nghĩa là 1 SP thuộc về 1 User tạo ra nó, nếu User bị deleted thì Products cũng bị deleted theo vì không có ai tạo ra nó 
            //// bảng SANPHAMs có cài đặt ràng buộc khóa ngoại :
                ///// FOREIGN KEY (`userId`) REFERENCES `users` ON DELETE CASCADE ON UPDATE CASCADE
                ///// đọc là a foreign key that references the ID field in the users table and that on delete
                ///// thông tin đáng chú ý là: ONUPDATE="CASCADE" is the default
        ///Bước 3: Từ các kết quả của console, refresh database first_node_schema
            /// thấy bảng SANPHAMs rỗng và có thêm 1 cột userId, vì Product.belongsTo(User) đã mặc định thêm cột khóa ngoại userId cho bảng SANPHAMs 
            /// cột userId mới thêm: there is a user ID field which was also added by sequelize and this will automatically be populated by sequelize too once we create products that are related to a user.


sequelize
//sync({force:true})  => cũng không cần khi có Model mới và Associations mới
.sync() //the connection object sync all the defined model instances to the DB
//ONCE the table is created based on Model instances trong thư mục models , thì hàm trong then() được thực thi
.then(result=>{ //result là sequelize object như 1 promise
    //console.log(result);//we dont wanna see the long object when we npm start
    
    //I actually now also want to create my user
    //findByPk sẽ LIMIT =1 so the success listener will always be called with a single instance 

    //thực hiện "SQL SELECT * FROM users AS user WHERE user.id=1;" Lúc này trả về bảng rỗng không có user nào
    return User.findByPk(1) //this is of course just some dummy code to see if I do have one user because I only need one for now as we have no authentication
    //and if I do have it, I'll not create a new one, if I don't have it I will. 
    //video trước có sync({force:true}) nên đã xóa tất cả bảng và create lại lần nữa . Nên bảng users hiện không có dòng nào   

    
})
.then(
    //Lúc này lời hứa tìm kiếm đã hoàn thành (a fulfilled-status Promise), thì trả về product hoặc không tìm thấy product nào
    //here I get the retrieved user từ hàm async User.findByPk(1), kết quả của fullfilled Promise object này có thể là có user hoặc user == null biến rỗng
    //check if I don't have a user, if I don't have a user, so if this is null because if I don't have a user 
    //let str_a = null;    // giải thích: biến str_a đã được khai báo, do đó biến str_a tồn tại và khác undefined, nhưng đối tượng mà str_a tham chiếu đến chưa tồn tại do đó str_a là null.
    /*
       //https://www.stdio.vn/javascript/so-sanh-undefined-null-va-rong-b1OkmL
       let str_b = "";      // có dữ liệu là chuỗi 0 ký tự hay rỗng
       let str_c = "stdio"; // có dữ liệu là chuỗi 5 ký tự
       Trường hợp biến str_b và str_c đều cùng khác undefined và khác null, thực chất trường hợp này như nhau, str_b và str_c đều đã tham chiếu đến 1 đối tượng kiểu string và chỉ khác ở giá trị dữ liệu đang lưu trữ.
          str_b tham chiếu đến 1 đối tượng kiểu string với chuỗi có 0 ký tự.
          str_c tham chiếu đến 1 đối tượng kiểu string với chuỗi có 5 ký tự.

    */

    //first, khai báo biến user lên bộ nhớ để đảm bảo nó có type khác undefined . Nếu chưa khai báo thì khi truy xuất dữ liệu của user sẽ báo lỗi undefined
    user=>{
        //tiếp theo, nếu Promise tìm thấy model instance thì sẽ gán vào user nên chắc chắn biến user is not null (vì có chứa địa chỉ trỏ tới đối tượng) 
        // nếu Promise không tìm thấy model instance thì sẽ không gán vào user , nên user không có địa chỉ trỏ tới đối tượng nào, nên user is null (trong C# gọi null là empty rỗng)
        // truy xuất giá trị của biến rồi cho vào if(giá trị null) => false 
        // if(giá trị khác null) => true
        //https://stackoverflow.com/questions/33057414/shorter-way-of-testing-for-null-and-undefined-in-javascript

        //check if I don't have a user, so if this is null because if I don't have a user
        if(!user){
            //if(null) => false
            //if(not null)=> true thì chạy nhánh if lúc này biến user rỗng/null

            //return a Promise object
            return User.create( //instantiate the User Model class 
                //pass here a Javascript object  với các giá trị dummy (bất kỳ, sai format email cũng ok) cho các thuộc tính
                {
                    name:'Maxime',
                    email:'test2@test.com'
                }
                //ngoại trừ id là tự động, make sure bạn populate all properties specified in User model class 
                /*
                   =>  Bước 1: npm start sẽ chạy app.js thì sync() sẽ thực hiện SQL sau để thêm dòng đầu tiên vào bảng users:
                    
                    INSERT INTO users(id,name,email,createdAt,updatedAt)
                           VALUES(DEFAULT,?,?,?,?)
                    user{
                        dataValues:{
                            id:1, 
                            name:'Max',
                            email:'test@test.com',
                            updatedAt: 2022-06-17T15:36:57.940z,
                            createdAt: 2022-06-17T15:36:57.940z
                        }
                    }

                 => Bước 2: chạy npm start cho app.js lần nữa
                    still works and it doesn't create a new user here because we already have one.
                
                */
                //chú ý ModelClass.create() cũng sẽ returns a Promise , do đó tui cho chữ return trước User.create() để khỏi phải chain .then() tiếp theo ngay trong then() này
            );
        }
        // we might never execute if because we already got a user ID=1.
        //return user; //trả về biến chứa địa chỉ của đối tượng 


        //tuy nhiên inconsistent (không thống nhất với nhau) vì anynomous function (user)=>{} returns either a Promise or an object 
        //we should always return the same so that we can chain then tiếp theo successfully (Promise is chainable) để đón nhận a fulfilled Promise từ hàm ở đây
        //thay vì dùng return user; thì nên sửa return 1 Promise cho thống nhất với if, just wanted to highlight that you should make sure that the values are equal

        //Có cần thiết dòng này không? // thực ra ghi "return user;" cũng được, vì  if you return a value in a then() block, it is automatically wrapped into a new promise
        return user;  //Promise. là PromiseContructor  ,biến user có kiểu Model<any,any> và thenable , hàm resolve trả về Promise<Model<any,any>> nghĩa là Promise mới whose internal state matches the provided value. 
        
        //user sẽ được xử lý ở then tiếp theo với tư cách là tham số của hàm anynomous callback 
        //essentially (return) a promise that will immediately resolve to user.
        //where is the Promise variable?? 
    }

)
.then(
    // an object user was wrapped into a Promise object, therefore here I now definitely (không phải đoán assume nữa) know that I got a user
    user=>{
        //console.log(user); 
        //where I get that user, I will also create a cart by:
        return user.createCart(); //return Promise và đi vào then tiếp theo
        //an insert into carts call is done here INSERT INTO carts (id,createdAt,updatedAt,userId) VALUES (DEFAULT,?,?,?), I don't need to pass any data in there because cart in the beginning will not hold any special data, it just needs to be there.
        //2 lần npm start (nodemon chờ changes trong code sẽ thực hiện nodemon index.js) thì tạo 2 carts id=1 và id=2 . Cả 2 đều gắn với userId=1  


        //Sau npm start lần 1 thì bảng rỗng đã được thêm dòng đầu tiên, check code if(!user) bằng cách npm start lần 2 , refresh bảng users không thấy dòng mới vì đã tồn tại model instance ở ID=1 nên không create nữa
        //with this chain made, we now always have a user available
    }
)
.then(cart=>{
    //only listen in the next step where I get my cart
    app.listen(3003)
})
.catch(err=>{
    console.log(err);
});
/* Tổng kết:
   ** KHi khởi động app bằng npm start
      thì User.create( { first_person } ).then(user => return user.createCart() ).then(cart => app.listen(3001) ) 
   ** nghĩa là sau khi khởi động phải tạo được 1 user liên kết cart rỗng thông qua userId, sau đó mới bắt đầu lắng nghe các request object. Nếu có bất kỳ req object nào tới app.use(  (req,res,next) => { thì sẽ gán thêm thuộc tính cho req, bằng cách req.user=user  }) 
*/





//The sync method has a look at all the model classes you defined
// it is aware of all your models and it then basically creates tables for them.
//WHY sequelize.sync() inside app.js? I want to ensure that all my models are basically transferred into tables or get a table that belongs to them whenever/or before we start our application
   /// Mỗi khi app khởi động là ta ngay lập tức theo dõi được console.log(result_of_sync)


