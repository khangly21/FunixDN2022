const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db=require('./util/database'); // the pool which allows us to use a connection in it

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//we just want to connect or execute a command
db.execute('SELECT * FROM products')
   .then(result=>{
       //console.log(result[0],result[1]);
       console.log(result[0]); //Bảng products dưới dạng mảng
   })
   .catch(err=>{
       console.log(err);
   });
//We can also end it and we want to end it whenever our application is to shut down
//db.end(); //but we don't shut our application down in this case không cần dòng này

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

//quy tắc là đi từ top tới bottom, khi không còn middleware nào mà vẫn yêu cầu thì báo lỗi 404 ở dòng cuối cùng
app.use(errorController.get404);

app.listen(3000);
