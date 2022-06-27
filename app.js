const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User=require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  //find a user by ID, I can now search for that ID and I convert that in the user model, remember that is why I can use a string here.
  User.findById('62b8211988e99bcbaf8e97ff') //copy id của user đầu tiên của bảng users trong db test
      .then(user=>{
        //user chắc chắn khác null và khác undefined, vì đã manually create document này trên Mongo collection users 
        //lưu access/reference tới đối tượng user (I get access to my user)
        req.user=user;
        next();
      })
      .catch(err=>console.log(err));
      //now we're at least prepared to set up a connection between our product and our user which we can use later.
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes); //shopRoutes is middleware


app.use(errorController.get404);

mongoConnect(() => {
  //Đã kết nối tới:
    ///srvHost: 'khangserver0.w0azxjp.mongodb.net'
    ///dbName: 'test'
  //add some code to see if a user with a certain ID exists

  //Không cần check exists vì trên mongo tui manually add new user nên chắc chắn nó tồn tại, nên không cần if(user)
  app.listen(3004); //khi npm start, có thể do page loading chậm nên xuất hiện "Page not found"
});
