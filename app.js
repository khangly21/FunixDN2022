const path = require('path');
const mongodb = require('mongodb');


const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const errorController = require('./controllers/error');


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
      
      next();
    })
    .catch(err => console.log(err));
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// set up connection tới mongodb bằng mongoose
mongoose.connect('mongodb+srv://lyvietkhang_admin:FLC0EfhTqJHonvsI@khangserver0.w0azxjp.mongodb.net/test?retryWrites=true&w=majority')
        .then(result=>{
            //want to bring up my node server or to be precise, start listening for incoming requests.
            //Mentor: Mỗi req chỉ tới 1 port thôi
            app.listen(3000);
        })
        .catch(err=>{
          console.log(err); //potential error I might be getting when trying to get connected
        })
//we already have everything in place we need to connect
//mongoose as I mentioned will manage that one connection behind the scenes for us
//so that in other places where we start using mongoose, we use that same connection we set up here, really convenient of course
