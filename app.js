const path = require('path');

const mongodb = require('mongodb');

//lấy hàm express()
const express = require('express');

//mongoose instance
const mongoose = require('mongoose');

//lấy hàm session() để tạo session khi mà thấy yêu cầu login hợp lệ với thông tin csdl , thì tạo session như 'đánh dấu / tô màu' cho tất cả các req đơn lẻ của người đó trong suốt phiên lướt website
const session=require('express-session'); 

//let our express-session is stored inside document store on MongoDB Atlas (not limited memory)
const MongoDBStore=require('connect-mongodb-session')(session); //actually gives you a function which should execute to which you pass your session. vế phải sẽ yield a constructor function to store in vế trái

//https://expressjs.com/en/resources/middleware/body-parser.html
const bodyParser = require('body-parser');
//có các middlewares sau:
   /// bodyParser.urlencoded([options]) => nhận đầu vào là <input name='x' value='y'/> và trả đầu ra là js object {name:'x',value:'y'}
   /// bodyParser.json([options])

const errorController = require('./controllers/error');

//import User model / class (constructor) nên viết hoa U để tạo ra mongoose model với các magic functions 
const User=require('./models/user');

const MONGODB_URI='mongodb+srv://lyvietkhang_admin:FLC0EfhTqJHonvsI@khangserver0.w0azxjp.mongodb.net/testMongoose?';
//nếu error thì có thể bỏ retryWrites=true

//kích hoạt hàm express() để tạo express instance , từ đây có thể gọi hàm on this instance
const app = express(); //express là hàm được exported bởi express module
//với app thì có thể set up / register các middleware (stack) (cũng gọi là miniapp vì nhận req và trả res) , VD: session()

// now we can setup and use a store as a session storerage
const session_store= new MongoDBStore({
    //inside this constructor you can pass some options in js object
    //which options could that database store require?
    //it will require a connection string (lấy connection string của mongoose, vì dùng 2 lần nên cho vô 1 biến toàn cục) because it needs to know in which database, on which database server to store your data.
    uri:MONGODB_URI,
    // you need to to define the collection where your sessions will be stored and the name is up to you
    collection:'sessions'
    //more info. when expires, can be cleaned up automatically by mongodb?
}) ; //MongoDB là 'document-oriented database' or 'document store'

app.set('view engine', 'ejs');

//app.set('views', 'views');
app.set('views', path.join(__dirname, 'views'));

//để sử dụng các router, phải register chúng cho app.js
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const autRoutes=require('./routes/auth');

//urlencoded() return middleware that only parses urlencoded body, thường dùng trong form post
app.use(bodyParser.urlencoded({ extended: false }));

//provide this public directory as static resource with this simplest API: app.use(static('public' ))
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
      
      secret:'my secret',
      resave:false,
      //set resave to false, this means that the session will not be saved on every request that is done,  on every response that is sent. But but only if something changed in the session => improve performance and so on
      saveUninitialized:false,
      //req.session:"session xin chào",  //sẽ bị báo lỗi
      store:session_store  //ok. truy cập Mongodb lấy session ? Không, là tạo store chứa session. Có thể dùng redis store: https://stackoverflow.com/questions/21212828/cannot-access-req-session-variables-in-express-nodejs
}));

//Assume a request coming (with or without a session cookie), session middleware is initialized and session data is loaded using the session cookie and we're now ready to use the req.session

//So BY the time we reach this general middleware, we'll have our session data loaded. 
   ///means that now we just want to use that session data to load our real user, to create our MONGOOSE user model (có các hàm nữa) and how do we do that?
// thầy gọi là "general" middleware
//How to do that?Well we don't need to reach out to the database again


app.use((req,res,next)=>{//this middleware is triggered for every request 
    if (!req.session.user) { 
      //checking for the existence of req.session.user trong mỗi req tới cánh cổng này
      //Lúc này chưa thực hiện postLogin, hoặc sau khi log out thì req.session chưa có biến user
      //Chú ý là req.session lúc nào cũng giữ biến cookie, còn lại thêm biến gì tùy người dùng
      console.log("req của getLogin lúc đang không KYC",req.session)
      // if I don't have a user stored in my session, then I can just call next and I return next so that the code thereafter, this one will not be executed
      return next();
    }
    //dùng Model của Mongoose để đón dữ liệu của req.session.user 

    //static: session.user là dữ liệu không bị hủy sau bất cứ res.redirect nào trước đó
    //dynamically thứ nhất , bất cứ req nào tới middleware session() đều làm đầu vào của nó và được gán thành session.user , do đó bất chấp có redirect 
    //duynamically thứ hai, findById() nhận id tùy vào postLogin
    User.findById(req.session.user._id)  //Điều kiện là MongoDB phải có req.session.user và dùng model User để tra cứu trong bảng "users", nếu không sẽ báo lỗi 500 cannot read _id of undefined ngay cả với nhấn Login req bị chặn vì lỗi req tới đây
    .then(user => { // I get back a mongoose model user which I store in request user with Mongoose methods
        
        req.user=user;  //sẽ dùng Mongoose model để có các Mongoose model chứ không dùng req.session.user nữa
        
        next(); 
    })
    .catch(err => console.log(err));
})

//API= how to communicate with the system you are creating  (Bản mô tả cách sử dụng phần mềm). 
    /// VD để mô tả cách sử dụng một máy chủ mới được tạo, thì có thể sử dụng các quy tắc của Express (do đó có câu Express is the web server used by the api)
    /// VD group facebook Pi360do lập các mô tả quy tắc cho người vào nhóm phải tuân theo (VD không cài link vào, không direct message ...)
// api route = A route within an API is a specific path to take to get specific information or data out of
   
//register routes with "leading filters" for app  
//công thức là app.use(path,middleware callback(s))
//By piecing together many of these API routes (also known as endpoints) we can build a functional API that can drive our applications
  /// (nhóm các API có cùng chức năng lại sẽ tạo 1 functional API (function-oriented API)  giải thích rõ ràng cách dùng ứng dụng)
//different types of API routes (known as endpoints)
app.use('/admin', adminRoutes);
//các middlewares sau no leading filter so every request will go in there and anything which is not found in the shop routes will therefore go into the auth routes
app.use(shopRoutes);
app.use(autRoutes);

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

//console.log("hey Randyyyy", typeof(new mongodb.ObjectId(24)) , new mongodb.ObjectId(24));  //object 00000018583af60838beac1f
const object={
  //local variable, nên phải được tiếp cận bằng object.name
   name:'Kahn',
   age:8
};

//console.log(object, typeof(object.age)); // {name:'Kahn',age:8 }  number. Như vậy không phải được console.log là thành string

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
            //sau khi kết nối thành công thì các model (chữ này ý chỉ instance của Model/Class) mới thực hiện được các hành động như findOne(), save() đối với Collection 
            
            //ĐÃ CÓ collection "users" trên MongoDB từ lúc tạo Model tên là Class "User", vì mongoose đọc qua các bảng trên MongoDB, thấy thiếu users collection đã đăng ký thì tự động tạo thôi
            //Đọc users collection xem có rỗng không, nếu rỗng thì thêm vào record đầu tiên, vì 1 cần đối tượng user để gọi các hàm service cho các nút "Cart" và "Orders"

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
