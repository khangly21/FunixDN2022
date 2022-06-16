const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//import the sequelize object thay vì db chứa data connection pool như trước kia
//const db=require('./util/database'); // the pool which allows us to use a connection in it
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

//quy tắc là đi từ top tới bottom, khi không còn middleware nào mà vẫn yêu cầu thì báo lỗi 404 ở dòng cuối cùng
app.use(errorController.get404);

//sync all defined models to database (by creating the appropriate tables)
//.then() listens to the result of this ( what we get back as a response )
   /// lý do dùng then() là hover lên sync() sẽ thấy sync trả về Promise
//.catch() potential errors if there
sequelize.sync().then(result=>{ //result là sequelize object như 1 promise
    //console.log(result);//we dont wanna see the long object when we npm start
    app.listen(3002);
})
.catch(err=>{
    console.log(err);
});
//The sync method has a look at all the models you defined
// it is aware of all your models and it then basically creates tables for them.
//WHY sequelize.sync() inside app.js? I want to ensure that all my models are basically transferred into tables or get a table that belongs to them whenever/or before we start our application
   /// Mỗi khi app khởi động là ta ngay lập tức theo dõi được console.log(result_of_sync)


