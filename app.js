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


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(  (req,res,next) => { 
    //Mục tiêu: register a new middleware because I want to store that user in my request so that I can use it from anywhere in my app conveniently.
    //want to reach out to my database and retrieve my user with user findByPk().

    //for an incoming request, we will then execute this function (req,res,next)=>{}
    //Chú ý:  incoming requests are ONLY funneled through our middleware
       /// npm start runs sequelize.sync() chứ không chạy các hàm nhận incoming req bên trong app.use
       /// it just registers it as middleware for incoming requests. So,  this code will only run for incoming requests which on the other hand can only reach this if we did successfully start our server here with app listen
           //// vị trí của app.listen() lúc này , we are guaranteed to find a user here
    User.findByPk(1)
       //do findByPk() trả về 1 Promise nên sau một thời gian dài xử lý, giá trị hàm trả về là 1 user model instance được wrapped trong Promise.resolve(user) và user sẽ là tham số của hàm anynomous trong then() tiếp theo
       .then(
           user=>{
               //thử truy xuất giá trị của javascript object user xem nó có đơn giản chứa các giá trị trong CSDL không
               //Cây trả lời là :  keep in mind the user we're retrieving from the database here is not just a javascript object with the values stored in a database,
                  ///it's a sequelize object with the value stored in the database and with all these utility methods sequelize added, like destroy.
                  /// we're storing this sequelize object here in the request and not just a javascript object with the field values
                  /// therefore whenever we call req.user in the future in our app, we can also execute methods like destroy.
               console.log("giá trị của model instance user: \n",user); //sẽ không chạy sau khi npm start vì Express app đang listen for req, chưa có req nào tới hết
               //sync().then().then().catch() cho phép đảm bảo luôn có 1 user available trong CSDL
               //do đó this fulfilled Promise sẽ luôn tìm thấy user, nên không xét if(!user) ở đây 
               req.user=user;
               //we can simply add a NEW field to our request object,we should just make sure we don't overwrite an existing one, like req.body
               //trong req object thì biến req.user mặc định thuộc type undefined (lý do là nó chưa hề tồn tại trên bộ nhớ)
               //now I'm storing the user I retrieved from the database in there, giúp cho req.user được khai báo và khác null (do mang địa chỉ trỏ tới model instance user)
               // if we get our user and stored it, continue with next()
               next();//https://stackoverflow.com/questions/13133071/express-next-function-what-is-it-really-for 
               // we've got the user set up and retrieved, now make sure that we can also use it to create new products that are associated to that user.
           }
       )
       .catch(err=>console.log(err)); //err != null , log() sẽ truy cập giá trị của biến đối tượng err
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

//quy tắc là đi từ top tới bottom, khi không còn middleware nào mà vẫn yêu cầu thì báo lỗi 404 ở dòng cuối cùng
app.use(errorController.get404);


//tell Association between 2 models for Sequelize
//we are now setting up a One_to_Many association for sequelize
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})  // onUpdate="CASCADE" là mặc định không cần ghi
//Ý NGHĨA: one/a Product only BELONGS TO ONE/a User and automatically add userId vào bảng SANPHAMs
//Ý nghĩa chiều ngược lại: A User can also own multiple Products hay own 1 Product only (User.hasMany(Product) hoặc User.hasOne(Product)). 
     ///https://sequelize.org/docs/v6/core-concepts/assocs/ nói belongsTo là mặc định hiểu mối quan hệ phải là 1:1 nên không cần ghi  User.hasOne(Product) . Hover lên "belongsTo" sẽ thấy dòng "target model User is associated with the hasOne relationship"
     /// Muốn có quan hệ 1:N thì Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'}) kết hợp User.hasMany(Product);

//có thể làm mối liên kết thêm rõ ràng hơn. Bạn ontional thêm vào: because one user can of course add more than one product to the shop.
User.hasMany(Product); //this is OPTIONAL, you don't need that. Cũng tương tự có thể thay thế Product.belongsTo(User) bằng User.hasMany(Product). I also like to define both directions to really make it clear how this relation works.
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
sequelize.sync() //the connection object sync all the defined model instances to the DB
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
                    name:'Max',
                    email:'test@test.com'
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
        return Promise.resolve(user);  //Promise. là PromiseContructor  ,biến user có kiểu Model<any,any> và thenable , hàm resolve trả về Promise<Model<any,any>> nghĩa là Promise mới whose internal state matches the provided value. 
        
        //user sẽ được xử lý ở then tiếp theo với tư cách là tham số của hàm anynomous callback 
        //essentially (return) a promise that will immediately resolve to user.
        //where is the Promise variable?? 
    }

)
.then(
    // an object user was wrapped into a Promise object, therefore here I now definitely (không phải đoán assume nữa) know that I got a user
    user=>{
        //console.log(user); 
        //server listening
        app.listen(3002); //Sau npm start lần 1 thì bảng rỗng đã được thêm dòng đầu tiên, check code if(!user) bằng cách npm start lần 2 , refresh bảng users không thấy dòng mới vì đã tồn tại model instance ở ID=1 nên không create nữa
        //with this chain made, we now always have a user available
    }
)
.catch(err=>{
    console.log(err);
});
//The sync method has a look at all the models you defined
// it is aware of all your models and it then basically creates tables for them.
//WHY sequelize.sync() inside app.js? I want to ensure that all my models are basically transferred into tables or get a table that belongs to them whenever/or before we start our application
   /// Mỗi khi app khởi động là ta ngay lập tức theo dõi được console.log(result_of_sync)


