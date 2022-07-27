const path = require('path');

const mongodb = require('mongodb');

//lấy hàm express
const express = require('express');

//mongoose instance
const mongoose = require('mongoose');

const session=require('express-session'); //sau này register session() cho app.use() thì sẽ có session-cookie trên browser

//let our express-session package store session data in the database (not limited memory)
const MongoDBStore=require('connect-mongodb-session')(session); //actually gives you a function which should execute to which you pass your session. vế phải sẽ yield a constructor function to store in vế trái

const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//import User model (constructor) nên viết hoa U
const User=require('./models/user');

//connection string from mongoose to mongodb. all capital case to signal that this is basically a constant value which I'll reuse
//note that the session now will also be stored in a 'testMongoose' database
//you could use a different database but then you need to use two different urls
//I'm fine with using the same database.
const MONGODB_URI='mongodb+srv://lyvietkhang_admin:FLC0EfhTqJHonvsI@khangserver0.w0azxjp.mongodb.net/testMongoose?';
//nếu error thì có thể bỏ retryWrites=true
//testMongoose?directConnection=true';  Error connecting to db: SRV URI does not supporting directConnection


//sử dụng class User để sử dụng hàm static và lưu trữ access tới một User instance 
//class cũng đồng nghĩa với hàm , khác hàm ở chỗ class có thể gọi biến static , và định nghĩa các hàm non-static để gọi instance/this thực hiện hành động
//theo thí nghiệm Lab6.1 thì this sẽ trỏ tới class nếu hàm static bind với this , mặc khác this sẽ trỏ tới instance nếu hàm nonstatic bind với this
//const User = require('./models/user');

//kích hoạt hàm express() để tạo express instance , từ đây có thể gọi hàm on this instance
const app = express(); //express là hàm được exported bởi express module

// now we can setup and use a store as a session store
const session_store= new MongoDBStore({
    //inside this constructor you can pass some options in js object
    //which options could that database store require?
    //it will require a connection string (lấy connection string của mongoose, vì dùng 2 lần nên cho vô 1 biến toàn cục) because it needs to know in which database, on which database server to store your data.
    uri:MONGODB_URI,
    // you need to to define the collection where your sessions will be stored and the name is up to you
    collection:'sessions'
    //more info. when expires, can be cleaned up automatically by mongodb?
}) ;

app.set('view engine', 'ejs');

//app.set('views', 'views');
app.set('views', path.join(__dirname, 'views'));

//để sử dụng các router, phải register chúng cho app.js
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const autRoutes=require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));

//provide this public directory as static resource with this simplest API: app.use(static('public' ))
app.use(express.static(path.join(__dirname, 'public')));


//INITIALIZE SESSION ( this middleware automatically sets a cookie for you, and it automatically reads the cookie value for you too, so it does all the cookie parsing and setting for you)
//register the "miniapp" session middleware to app. we pass 'session' and we EXECUTE this as a function which receive an js object where we configure the session setup as parameter 
   /// Goal is we want to initialize the session middleware at least and the session will then be used for every incoming request. 
   /// Implementation goal: Session middleware sẽ gắn session object vào trong req và các router sẽ tiếp cận bằng cách req.session
   /// set up session middleware (nhận tất cả requests) ngay trên middleware nhận tất cả requests

//https://expressjs.com/en/resources/middleware/session.html
app.use(session({
      //secret, this will be used for signing the hash which secretly stores our ID in the cookie. Set the secret with any text (vì typically a long string in production)
      secret:'my secret',
      resave:false,
      //set resave to false, this means that the session will not be saved on every request that is done,  on every response that is sent. But but only if something changed in the session => improve performance and so on
      saveUninitialized:false,
      //false saveUninitialized basically ensure that no session gets saved for a request where it doesn't need to be saved because nothing was changed about it
      //configure the session cookie, or go with the default settings (không nói gì hết thì khi chạy session() sẽ tạo 1 session cookie trên browser - mặc dù session trên cột Expires/maxAge nhưng không có nghĩa có maxAge hay expires in a future, xem session object thì maxAge: null nghĩa là bị deleted khi nào phụ thuộc ta đóng trình duyệt hay log out)
         /// https://stackoverflow.com/questions/39197038/why-is-my-session-expiring-every-time-i-close-the-browser
         
      store:session_store  //ok. truy cập Mongodb lấy session ? Không, là tạo store chứa session
}));
//session middleware is initialized and we're now ready to use the session.

//(req, res, next) makes  our  user trong 'users' collection  accessible to our router
//middleware này chưa hoạt động cho tới khi mongoose.connect và app.listen() thành công và có req tới port 3000
app.use((req, res, next) => {
    User.findById('62c4c9cce3789b7b623b3ba8')  //chỉ dần findById(stringId) thì Mongoose sẽ tự query objectId
    .then(user => {
      //store fully-populated user access vào trong req để các router có thể dùng trong request handler
      req.user = user //vậy req.user đã có cấu trúc của Model/Schema User nên có thể gọi hàm nonstatic addToCart
      console.log(user._id);
      console.log(typeof(user._id)); //object. Lý do user là Mongoose object
      console.log(user);
      /*
          keep in mind, 'User' is a full mongoose model so we can call all these mongoose model functions or methods on that 'user' object.
          therefore also on the user object which I do store in req.user.
          if I now save this for every incoming request, it should actually give us that user
      */
      
      next(); //không được res. gì đó ở đây vì kết thúc req-res cycle khi đó req cũng bị hủy
      //next() cho biết res chưa xuất hiện và req tiếp tục tới middleware tiếp theo! 
    })
    .catch((err) => console.log(err));
});


//register routes with leading filters for app  
app.use('/admin', adminRoutes);
//các middlewares sau no leading filter so every request will go in there and anything which is not found in the shop routes will therefore go into the auth routes
app.use(shopRoutes);
app.use(autRoutes);

//catch GET http://localhost:3000/xyz hay http://localhost:3000/orders (khi chưa mở route) 404 (Not Found) and forward err to error handler. 
//err khi req tới port 3000 nhưng đường url không xác định được
//Lần này dạy cách dùng next(err)
//https://stackoverflow.com/questions/31434272/find-a-user-by-objectid-express-js
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.get('/errors',(req,res)=>{  //Note: Khi yêu cầu http://localhost:5002/errors thì có endpoint '/errors' tồn tại trên server do đó không báo lỗi 404, nhưng req.locals là nguồn tài nguyên không có trong server nên báo lỗi 500 với nhiều đường dẫn ảnh hưởng bảo mật, do đó cần có middleware để render ra view 500.ejs
  //console.log("doi tuong req: ",req)

  //https://www.geeksforgeeks.org/express-js-res-send-function/
  //res.send trả về 1 object, không nhận callback 
  res.send(req.locals.message); //req.locals không tồn tại . Nói cách khác không tìm ra resource này trên middleware của server 
})

//Error handler có 4 tham số (err do middleware trước nhả ra, req,res,next. Nếu các middleware trước kết thúc req-res cycle thành công thì không có err nào nhả ra, nên không được ghi tham số err). Còn các middleware bình thường thì param đầu tiên phải là request object

//handle 404 Page not found (dĩ nhiên không có error nào nên không có biến đầu tiên là error)
//https://stackoverflow.com/questions/43356705/node-js-express-error-handling-middleware-with-router
app.use(errorController.get404); //nếu trong adminRoutes và shopRoutes xóa tất cả routes thì khi req vào port 3000 thì được server bắt được, so sánh không có một matching route nào hết nên đi vào API get404 nơi đó có res status 404 và hiển thị view 404

//handle 500 Internal Server Error
app.use(errorController.get500);

// mongoose.connect opens mongoose 's default connection to MongoDB
//Mongoose creates a default connection when you call mongoose.connect(). You can access the default connection using mongoose.connection

console.log("hey Randyyyy", typeof(new mongodb.ObjectId(24)) , new mongodb.ObjectId(24));  //object và có thể log được
const object={
  //local variable, nên phải được tiếp cận bằng object.name
   name:'Kahn',
   age:8
};

console.log(object, typeof(object.age)); //number. Như vậy không phải được console.log là thành string

//mongoose là "MongoDB adapter"
//nếu không dùng các options trong js object thì dùng port >5000 cho high versions of mongoose and mngodb để giải quyết vấn đề db connection times out
mongoose.connect(MONGODB_URI)
  /*
      , { 
       maxIdleTimeMS: 80000,
       serverSelectionTimeoutMS: 80000,
       socketTimeoutMS: 0,
       connectTimeoutMS: 0
      }

      thì vài lúc kết nối được, còn lúc không được thì báo lỗi: mongoNetworkError: connect ETIMEDOUT 52.77.81.2:27017
      Do đó nên đổi port từ 3000 sang trên 5000
  */
        
        .then(result=>{ 
            //sau khi kết nối thành công thì các model mới thực hiện được các hành động như findOne(), save() đối với Collection 
            
            //ĐÃ CÓ collection "users" trên MongoDB từ lúc tạo model tên là  "User", vì mongoose đọc qua các bảng trên MongoDB, thấy thiếu users collection đã đăng ký thì tự động tạo thôi
            //Đọc users collection 

            User.findOne().then(user=>{
              if(!user){
                //dùng Model User constructor để tạo model instance
                const user=new User({
                  //mongoose tự tạo _id
                  name:'Max',
                  email:'max@test.com',
                  cart:{
                    items:[]
                  }
                });
                //xong dòng này chưa có document nào trong collection "users"

                //lưu vào database. Hàm save() của Mongoose model chỉ thực hiện save sau khi the connection is established
                user.save(function(){ //local function này đóng vai trò là callback và không có tên
                      console.log("OK, empty collection 'users' now has the first document object");
                      console.log("Tuy nhiên mỗi khi restart npm start là lại tạo user trùng lắp trên MongoDB");
                      console.log("Solution là gì?? Không phải là lấy 1 user nào đó rồi lưu vào req.user");
                      console.log("Dùng mongoose findOne() return a Promise to find the first document object (user) it finds, then here in the then block, I will have my user object and only if this is undefined so if it is not set, only then I will create a new user which is a local variable now. ");
                      console.log("So therefore now if I refresh this we shouldn't have a new user in MongoDB");
                  }
                )
              }
            })
            
            //app tạo server nghe ngóng (Nếu dòng này không hiện ra là biết Mongoose cần update IP address)
            //app sẽ không chạy nếu có MongooseServerSelectionError (do IP thay đổi)
            app.listen(5002,function(){

              console.log("server is using app and listening  on port");
              console.log("Làm sao Express app sử dụng mongoose instance để map đối tượng javascript vào document?");
              console.log("Mỗi req chỉ tới 1 port, Nếu req tới port 3000 mà không có matching route thì res view 404, còn req mà tới port 5000 thì không có server nào và báo 'This page cannot be reached' ")
            
            });
        })
        .catch(err=>{
          console.log(err); //potential error I might be getting when trying to get connected
        })
//we already have everything in place we need to connect
//mongoose as I mentioned will manage that one connection behind the scenes for us
//so that in other places where we start using mongoose, we use that same connection we set up here, really convenient of course
