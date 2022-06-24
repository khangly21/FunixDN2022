const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//import database.js để app.js chạy thì kết nối MongoDB luôn
//will import a function because I'm exporting a function in database.js.
const mongoConnect=require('./util/database'); 

//Chạy app
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(  (req,res,next) => {   //Ctrl K C   sẽ comment out cả block trong VSC , muốn uncomment thì Ctrl K U
    // User.findByPk(1)
    //    .then(
    //        user=>{
    //            console.log("giá trị của model instance user sẽ không chỉ có đối tượng nhận được, nên gọi user là Sequelize object with magic sequelize features: \n",user); //sẽ không chạy sau khi npm start vì Express app đang listen for req, chưa có req nào tới hết
    //            //sync().then().then().catch() cho phép đảm bảo luôn có 1 user available trong CSDL
    //            //do đó this fulfilled Promise sẽ luôn tìm thấy user, nên không xét if(!user) ở đây 
               
               
               
    //            req.user=user; //vì sao user.save() thì ok, còn req.user không có suggest save() ??
               
    //            next(); //clever!!! next() giúp program control chạy tiếp và nếu phát hiện đường dẫn cụ thể matching thì sẽ xử lý luôn!! VD http://localhost:3001/admin/products thì cả 3 routes sau đều có handler chạy là: '*' =next()=> app.use(  (req,res,next) => {}) => app.use(/admin,adminRouter)+router.get('/products', adminController.getProducts);
               
    //        }
    //    )
    //    //Mặc dù lệnh next() tới route kế tiếp, nhưng nếu có err thì vẫn catch(err), đó là cách chạy của next()
    //    .catch(err=>console.log(err)); //err != null , log() sẽ truy cập giá trị của biến đối tượng err
})


// //vì sao tác giả luôn dùng app.use() để phối hợp router.get/post()
// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#prototype_methods
class Animal {
    //chỉ có 1 hàm tên keyword là "constructor" bên trong class (Nhớ lại ngôn ngữ Java định nghĩa nhiều constructors tên giống class và khác nhau ở số lượng tham số)
    
    //Không có constructor() thì new Animal trỏ tới class Animal vì nó là hàm, để tạo ra instance rỗng { }, muốn instance có các thuộc tính thì cần constructor() lúc này new Animal trỏ tới constructor (nên 1 reference) nơi nó sẽ có thuộc tính
    constructor(height,weight,width){
        //click references của Animal class thì thấy không có 3 anh this này 
        //Vậy 3 anh this này chính là để binds các instances vào 3 thuộc tính
        //Quy tắc là instance properties được định nghĩa trong constructor! 
        this.height= height;
        this.weight= weight;
        this.width=width;
    }

    speak() {
      console.log(this);//biến this này KHÔNG trỏ tới class Animal (KHÔNG có trong 4 references). Như vậy obj.speak chính là một method. Nói cách khác, do method tên speak binds với instance, nên instance kế thừa hàm speak()
    }
    static eat() {
      console.log(this); //biến this trỏ tới class Animal, vậy Animal.eat là một method. Instances sẽ không kế thừa hàm eat
    }
  }
  
  let obj = new Animal(8,8,8); //gọi hàm class, vì bản chất class là 1 hàm, thường gọi là utility function dùng trong applications
  obj.speak(); // Animal {} diễn giải là "the Animal object"
  let speak = obj.speak; //gán function obj.speak vào biến
  speak(); // undefined
  //obj.eat(); //gây ra app crash vì TypeError: obj.eat is not a function
  
  Animal.eat() // [class Animal], utility function hay gặp
  let eat = Animal.eat; //gán function Animal.eat vào 1 biến 
  eat(); // undefined

//gọi thực thi hàm với tham số là một hàm callback
//hàm callback sẽ được gọi thực thi sau khi kết nối thành công
mongoConnect((client)=>{
   //run app.listen sau khi once connected successfully
   console.log(client);
   app.listen(3000);
   //npm start sẽ gặp app crashed. WHY?
      ///when I bring up my server, we do actually register all our routes here and in the routes files, we dive into our controllers and in our controllers, then in models are using that sequelize object which simply does not exist anymore
      /// so now So now we got no working routes for the moment but this means that we can now at least connect
      
});