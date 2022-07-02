const path = require('path');
const mongodb = require('mongodb');


const express = require('express');

const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//import hàm mongoConnect từ database.js, sau đó hàm này sẽ được kích hoạt
const mongoConnect = require('./util/database').mongoConnect;

//sử dụng class User để sử dụng hàm static và lưu trữ access tới một User instance 
//class cũng đồng nghĩa với hàm , khác hàm ở chỗ class có thể gọi biến static , và định nghĩa các hàm non-static để gọi instance/this thực hiện hành động
//theo thí nghiệm Lab6.1 thì this sẽ trỏ tới class nếu hàm static bind với this , mặc khác this sẽ trỏ tới instance nếu hàm nonstatic bind với this
const User = require('./models/user');

//gọi hàm express() để tạo express instance , từ đây có thể gọi hàm on this instance
const app = express(); //express là hàm được exported bởi express module

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

//provide this public directory as static resource with this simplest API: app.use(static('public' ))
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  //https://www.softwaretestinghelp.com/mongodb/objectid-mongodb/

  //sử dụng class User để sử dụng hàm static và lưu trữ access tới một User instance 
  User.findById('62bd9f36671276d3bf58d33f')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      console.log("req.user instance là: \n",req.user , typeof(req.user)); //không phải req.user._id là ObjectId('62bd9f36671276d3bf58d33f') như trên mongodb , mà là 62bd9f36671276d3bf58d33f type object
      console.log("mongodb.ObjectId(req.user._id): \n",mongodb.ObjectId(req.user._id)); //62bd9f36671276d3bf58d33f



      console.log("type của user id là : ", typeof(req.user._id)); //object, ý nói là ObjectId('62bd9f36671276d3bf58d33f')
      console.log("type của hàm ObjectId nhận hexadecimal string as param: \n",typeof(mongodb.ObjectId('62bd9f36671276d3bf58d33f'))); //object 
      console.log("type của hàm ObjectId nhận hexadecimal string as param với thuộc tính str: \n",typeof(mongodb.ObjectId('62bd9f36671276d3bf58d33f').str)); //undefined ?? 
      console.log(mongodb.ObjectId('507f1f77bcf86cd799439011').str); //undefined 
      console.log(mongodb.ObjectId('507f1f77bcf86cd799439011').toString() , typeof(mongodb.ObjectId('507f1f77bcf86cd799439011').toString())); //string
      console.log(typeof(new mongodb.ObjectId('507f1f77bcf86cd799439011'))); //object ý nói là đối tượng hàm ObjectId('507f1f77bcf86cd799439011')
      console.log(mongodb.ObjectId().str); //undefined

      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);  //What happens if web server is down?
});
