const path = require('path');
//const mongodb = require('mongodb');


const express = require('express');

const Mongoose = require('mongoose'); //import mongoose class hay mongoose construtor

const bodyParser = require('body-parser');

const errorController = require('./controllers/error');


//sử dụng class User để sử dụng hàm static và lưu trữ access tới một User instance 
//class cũng đồng nghĩa với hàm , khác hàm ở chỗ class có thể gọi biến static , và định nghĩa các hàm non-static để gọi instance/this thực hiện hành động
//theo thí nghiệm Lab6.1 thì this sẽ trỏ tới class nếu hàm static bind với this , mặc khác this sẽ trỏ tới instance nếu hàm nonstatic bind với this
//const User = require('./models/user');

//gọi hàm express() để tạo express instance , từ đây có thể gọi hàm on this instance
const app = express(); //express là hàm được exported bởi express module

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

//provide this public directory as static resource with this simplest API: app.use(static('public' ))
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   //https://www.softwaretestinghelp.com/mongodb/objectid-mongodb/

//   //sử dụng class User để sử dụng hàm static và lưu trữ access tới một User instance 
//   User.findById('62bd9f36671276d3bf58d33f')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
      
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404); //nếu trong adminRoutes và shopRoutes xóa tất cả routes thì khi req vào port 3000 thì được server bắt được, so sánh không có một matching route nào hết nên đi vào API get404 nơi đó có res status 404 và hiển thị view 404

// mongoose.connect opens mongoose 's default connection to MongoDB
//Mongoose creates a default connection when you call mongoose.connect(). You can access the default connection using mongoose.connection

Mongoose.connect('mongodb+srv://lyvietkhang_admin:FLC0EfhTqJHonvsI@khangserver0.w0azxjp.mongodb.net/testMongoose?retryWrites=true&w=majority')
        .then(result=>{
            //hover chữ connect thấy trả về Promise<typeof mongoose>
            console.log("typeof result: ",typeof(result)) //object
            //The `mongoose.connect()` promise resolves to mongoose instance.
            console.log(result); //tạo CSDL tên "testMongoose"  ?
            console.log(result.connections[0].collections); //sanphams
            console.log(result.connections[0].models); // Sanpham
            console.log(result.connections[0].name); //testMongoose
            console.log("result chứa client là gì",result.connections[0].client)//MongoClient{  }
               /*
                  chứa url, topology 
               */
            //từ kết quả trên cho thấy result của connect thấy model Sanpham was mapped into "sanphams" (chưa có dòng doc nào) collection inside db "testMongoose"
            console.log("giả sử trong MySQL Workbench chỉ có 1 CSDL là 'test' của bài MySQL trước ");
            console.log("npm app này thì refresh thấy CSDL sanpham là 'test' , với người document (sanphams) cứ liên láo ")

            //want to bring up my node server or to be precise, start listening for incoming requests.
            //Mentor: Mỗi req chỉ tới 1 port thôi
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
