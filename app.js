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


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

//quy tắc là đi từ top tới bottom, khi không còn middleware nào mà vẫn yêu cầu thì báo lỗi 404 ở dòng cuối cùng
app.use(errorController.get404);

app.listen(3000);
