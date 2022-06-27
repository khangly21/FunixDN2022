const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User=require('./models/user');

//Express application onject access/reference
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//next là access/ref to the next middleware function , trường hợp này hàm mdlw kế tiếp là adminController.getAddProduct
app.use((req, res, next) => {
 //Không cần xét if trên do chắc chắn id 62b8211988e99bcbaf8e97ff có mặt trong CSDL
    User.findById('62b8211988e99bcbaf8e97ff') //trên mongoDB thì _id:ObjectId("62b8211988e99bcbaf8e97ff"), ở đây tham số phải là string id
      //sau khi find ra thì có user
      //then() này mất thời gian chờ đợi User.findById('62b8211988e99bcbaf8e97ff') , nên control sẽ thực hiện next() thứ hai
      .then(user=>{
        
        //Lưu access/reference của đối tượng user vào req.user để tái sử dụng nhiều nơi
        req.user=user;
        //Rõ ràng _id trong vế phải có kiểu ObjectId, bậy nếu _id được extract thì có kiểu gì? ObjectId bị converted thành string
        console.log("có phải string?: \n",typeof(req.user._id)); //object
         
        ////Mentor NgoTuanAnh: nếu có user (console.log ) được thì next đầu tiên chạy pass control qua matching route khác luôn, không chạy next kế nữa 
        console.log("ĐÂY LÀ NEXT ĐẦU TIÊN NHÉ!");
        
        next(); //async và tốn thời gian hơi lâu, nên console.log("I am searching for the next middleware") rồi console.log("Hello I AM then() after the 1st  NEXT !!! "); ra kết quả trước, sau đó next này mới bị báo lỗi
       
      })
      .catch((err)=>{
        console.log("Hello, error here: \n",err)
      });  
  
});

//app.use() to mount a path to the Express object.
app.use('/admin', adminRoutes); //adminController.getAddProduct là the next middleware function whose access is stored in the next object in


app.use(shopRoutes); //shopRoutes is middleware


app.use(errorController.get404);

mongoConnect(() => {
  //Đã kết nối tới:
    ///srvHost: 'khangserver0.w0azxjp.mongodb.net'
    ///dbName: 'test'
 
  app.listen(3005); 
});
