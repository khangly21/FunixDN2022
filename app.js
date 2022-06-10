const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/*
    app.use((req, res, next) => {
        res.status(404).render('404', { pageTitle: 'Page Not Found' });
    });

    //nothing wrong, but to be in line with our other code, I also want to put that into a controller.
    //it's clearly not related to products controller
*/

app.listen(3000);
