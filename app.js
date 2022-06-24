const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const mongoConnect=require('./util/database').mongoConnect; 

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(  (req,res,next) => {   //Ctrl K C   sẽ comment out cả block trong VSC , muốn uncomment thì Ctrl K U
   //ĐÂY LÀ LÝ DO TẠI SAO "http://localhost:3003/admin/add-product" cannot be reached. Đặc điểm là console sẽ không báo lỗi nào
   //Problem: req-res cycle của middleware này chưa được hoàn tất
   //Solution 1 (không có tham số err): next() 
   //Solution 2 (không có tham số err): res.status(500).json({ message: err.message });  Your function  **must** take 4 parameters for Express to consider it an error handling middleware.
   //Solution 3 (có err làm tham số);
})


// //vì sao tác giả luôn dùng app.use() để phối hợp router.get/post()
app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404); // 
app.listen(3003); //run app.listen sau khi once connected successfully

mongoConnect(()=>{ //Hàm callback không nhận tham số nào hết
    //our app will maintain and reuse a single connection pool (_db) to each database (https://dzone.com/articles/mongodb-connection-pooling-for-express-application)
    //WHY?  This reduces pressure on the database caused by creating and authenticating new connections or by maintaining multiple unused connection pools (https://www.compose.com/articles/connection-pooling-with-mongodb/)
        ///reusing (TÁI SỬ DỤNG) existing connection pools allows the application to quickly retrieve database results without having to go through the connection creation and authentication process each time
    //HOW the app.js use _db here? 
    

    //Problem with automatic connection once npm start?: ??

});