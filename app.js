const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//The req.body property contains key-value pairs of data submitted in the request body. By default, it is undefined cho tới khi bạn dùng hàm middleware bên trong app.use() để phân tích giải mã
//// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); //https://www.geeksforgeeks.org/express-js-req-body-property/

//set up for static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
