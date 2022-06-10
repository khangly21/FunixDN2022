const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin'); //trước kia là adminData do có chứa products, nhưng giờ chỉ chứa route
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false })); //làm việc với form
app.use(express.static(path.join(__dirname, 'public'))); //trỏ tới static files

//app.use('/admin', adminData.routes); //khi exports.routes = router; khỏi admin.js

app.use('/admin',adminRoutes); //exports.routes = router; khỏi admin.js
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
