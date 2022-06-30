const path = require('path');

//package module 'express' exports the express() function. Bản chất của Express application là 1 function, và Express application sẽ làm callback cho 
const express = require('express');

let port=5004;

const bodyParser = require('body-parser') ;

const errorController = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;

const User=require('./models/user');

//MYTH: lưu trữ access/ref tới Nodejs Server instance (ý tưởng tương tự models rất hay dùng const db=getDb() để nhận access tới Database instance, sau đó có thể thực hiện các tác vụ trên CSDL "test" như db.collection('users').updateOne()       )
//Thực ra hover lên chữ listen sẽ thấy: application app là một function và sẽ làm callback cho Node server instance
const app = express(); //It has a middleware stack

//views
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//app.use is a way to register middleware or chain of middlewares (or multiple middlewares) before executing any end route logic or intermediary route logic depending upon order of middleware registration sequence.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(path, middleware function/s)
    ///the path is optional. When no path is specified the function gets executed every time the app receives a request, irrespective of which URL has been hit.
    //app.use is woks as middleware for app request. syntax
    //https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
//Bất cứ req nào nha, app.use() will be called for every request: GET, POST, PUT, PATCH, DELETE
//This middleware will not allow the request to go beyond it, // Make our db accessible or req.user to our routers
//app.use(req, res, next) is an API that allows us to add one or more middlewares to the request pipeline of express
app.use((req, res, next) => {//API này chỉ sử dụng req object, nên nó tiếp xúc khách hàng chứ không tiếp xúc đầu bếp

    User.findById('62bd9f36671276d3bf58d33f') 
      //PROBLEM: nếu trên mongodb có 2 documents với userId là ObjectId('62b8211988e99bcbaf8e97ff') thì trong User.findById() có findOne() chỉ chọn một, cần chọn anh nào?
      //PROBLEM: nếu cả 2 document có dữ liệu giống nhau hoàn toàn (cả userId) thì phân biệt thế nào?
      
      .then(user=>{ //Mongo object này chứa các access tới data trên MongoDB như user.name, user.email,user.cart,cart._id
        
        //Lưu access/reference tới dữ liệu thực sự của đối tượng user vào req.user để tái sử dụng nhiều nơi
        //Phần trước đã biết req.user=user sẽ không sử dụng method của class được 

      // console.log(typeof(user)); //null
      // console.log(user); //object

      if(user!=null){ //Rõ ràng hơn if(user) nếu user khác x (với x= undefined hay null). CHừng nào .catch(err) thì mới bị báo err undefined 

        //vì sao gán trực tiếp new User() vào req.user mà không thông qua một biến khác? (xem Lab6.1 với class Animal)
        req.user = new User(user.name, user.email, user.cart, user._id); //Typeerror: cannot read properties of null (reading 'name')
        //Vấn đề là user.cart không có trên MongoDB nên user.cart undefine cho req.user
        //Thứ hai là nếu click button "cart" sẽ báo lỗi TypeError: Cannot read properties of undefined (reading 'items') 


        console.log(req.user.cart); //undefined
        console.log(req.user._id); //62b8211988e99bcbaf8e97ff
        console.log(typeof(req.user._id)); // log ra object, nhưng thực ra object này có định danh của riêng nó là 62b8211988e99bcbaf8e97ff,  "object có kiểu dữ liệu 62b8211988e99bcbaf8e97ff"  (đây chính là cách MongoDB định danh kiểu dữ liệu cho đối tượng kiểu ObjectId)
        console.log(typeof(req.user._id.toString())); //string
        req.user.sayHi(); //ok, giả sử req.user=user thì req.user chỉ chứa các properties trỏ tới data của user '62b8211988e99bcbaf8e97ff' trên MongoDB
        
      }
        //req.user= new User(user.name,user.email,user.cart,user._id); //phải theo thứ tự tham số, nếu ghi cart._id là ReferenceError
        //Trạng thái ban đầu của req.user là: req.user= user trong đó user chỉ chứa các access đến dữ liệu trên MongoDB, thứ tự thông tin trên mongodb là: _id, name, email . Nhược điểm là req.user này không sử dụng các methods của class User được vì methods không lưu trên mongodb
        //Trạng thái thứ hai của req.user là: req.user chứa User instance, thứ tự user.name,user.email,user.cart,user._id là dữ liệu lấy từ mongodb, trong đó user.cart chưa có trên mongodb nên undefined, Ưu điểm là req.user giờ có thể inherit gọi hàm của class User . Dĩ nhiên MongoDB không thêm cart vào vì đâu có hàm để update trong User class
        
        console.log("req.user có thêm cột cart là: \n",req.user); //do ảnh hưởng của next() ka2 req.user được lặp nhiều lần
        //Sau khi yêu cầu GET localhost:3005/ thì dòng log này hiện ra 9 lần vì middleware này nhận req 9 lần ?? SAI vì gặp next() nó nhảy tới router.get('/', shopController.getIndex);
           
        //I create a new User instance with MongoDB DATA and store in req object 
        //Why? req.user enables us to work with the whole user model (data and call methods)

        next(); //this middleware function next() allows req to be passed to the next matching route!

        //async và tốn thời gian hơi lâu, nên console.log("I am searching for the next middleware") rồi console.log("Hello I AM then() after the 1st  NEXT !!! "); ra kết quả trước, sau đó next này mới bị báo lỗi
        //nếu gõ "http://localhost:5001/" thì next không phải tới app.use('/admin', adminRoutes); mà tới router.get('/', shopController.getIndex);
      })
      .catch((err)=>{ 
        console.log("Hello, I caught 1 error: \n",err);
        throw "Some TypeError or Reference Error in this Promise";
      });  
  
});

//app.use() to mount a path to the Express object.
//https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
app.use('/admin', adminRoutes); //6  app.use() mount the path on '/admin' to adminRoutes
app.use(shopRoutes); //shopRoutes is middleware, //4

//always the final middleware when all above routes not matching
app.use(errorController.get404);

mongoConnect(() => {
  //sử dụng địa chỉ url với protocol mongodb+srv:// ở tầng mạng
  //Đã kết nối tới:
    ///srvHost: 'khangserver0.w0azxjp.mongodb.net',(which has a built-in JS runtime, Đó là lý do vì sao trong models >> user>> getCart có dùng hàm map  )
    ///dbName: 'test'

  //hàm listen sẽ create Node Server instance and use Express application app as callback
  //app.listen(3000); 
  app.listen(port, function(err){
    if (err) console.log(err);
    console.log(`HTTP Server listening on PORT ${port} using Express app function as callback, with MongoDB access`);
  });
  //app.close() is not a function

  //dễ gặp lỗi EADDRINUSE means that the port number which listen() tries to bind the server to is already in use.
  //https://www.geeksforgeeks.org/how-to-kill-all-instances-of-a-node-js-process-via-command-line/ =>chỉ cho NodeJS, không cho express. Không nên kill process vì có những process quan trọng đang chạy
  //https://stackoverflow.com/questions/8659011/how-do-i-programmatically-shut-down-an-instance-of-expressjs
});
