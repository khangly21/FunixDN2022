const path = require('path');
//const mongodb = require('mongodb');

//lấy hàm express
const express = require('express');

//mongoose instance
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
//import User model (constructor) nên viết hoa U
const User=require('./models/user');

//sử dụng class User để sử dụng hàm static và lưu trữ access tới một User instance 
//class cũng đồng nghĩa với hàm , khác hàm ở chỗ class có thể gọi biến static , và định nghĩa các hàm non-static để gọi instance/this thực hiện hành động
//theo thí nghiệm Lab6.1 thì this sẽ trỏ tới class nếu hàm static bind với this , mặc khác this sẽ trỏ tới instance nếu hàm nonstatic bind với this
//const User = require('./models/user');

//kích hoạt hàm express() để tạo express instance , từ đây có thể gọi hàm on this instance
const app = express(); //express là hàm được exported bởi express module

app.set('view engine', 'ejs');
//app.set('views', 'views');
app.set('views', path.join(__dirname, 'views'));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

//provide this public directory as static resource with this simplest API: app.use(static('public' ))
app.use(express.static(path.join(__dirname, 'public')));

//Sau khi có user trong 'users' collection 
app.use((req, res, next) => {
  User.findById('62c4c9cce3789b7b623b3ba8')
    .then(user => {
      //store user access vào trong req để các router có thể dùng trong request handler
      req.user = user

      /*
          keep in mind, 'User' is a full mongoose model so we can call all these mongoose model functions or methods on that 'user' object.
          therefore also on the user object which I do store in req.user.
          if I now save this for every incoming request, it should actually give us that user
      */

      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404); //nếu trong adminRoutes và shopRoutes xóa tất cả routes thì khi req vào port 3000 thì được server bắt được, so sánh không có một matching route nào hết nên đi vào API get404 nơi đó có res status 404 và hiển thị view 404

// mongoose.connect opens mongoose 's default connection to MongoDB
//Mongoose creates a default connection when you call mongoose.connect(). You can access the default connection using mongoose.connection


mongoose.connect('mongodb+srv://lyvietkhang_admin:FLC0EfhTqJHonvsI@khangserver0.w0azxjp.mongodb.net/testMongoose?retryWrites=true&w=majority')
        .then(result=>{
            
            //want to bring up my node server or to be precise, start listening for incoming requests.
            //Mentor: "Mỗi req chỉ tới 1 port thôi"

            //ĐÃ CÓ collection "users" trên MongoDB từ lúc tạo model "User"
            User.findOne().then(user=>{
              if(!user){
                const user=new User({
                  name:'Max',
                  email:'max@test.com',
                  cart:{
                    items:[]
                  }
                });
                //xong dòng này chưa có document nào trong collection "users"

                user.save(function(){
                console.log("OK, empty collection 'users' now has the first document object");
                console.log("Tuy nhiên mỗi khi restart npm start là lại tạo user trùng lắp trên MongoDB");
                console.log("Solution là gì?? Không phải là lấy 1 user nào đó rồi lưu vào req.user");
                console.log("Dùng mongoose findOne() return a Promise to find the first document object (user) it finds, then here in the then block, I will have my user object and only if this is undefined so if it is not set, only then I will create a new user which is a local variable now. ");
                console.log("So therefore now if I refresh this we shouldn't have a new user in MongoDB");
            })
              }
            })
            
            

            //app tạo server nghe ngóng
            app.listen(3000,function(){
              console.log("server is using app and listening on port");
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
