const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  console.log("body của POST req sau khi postSignup: \n",req.body) //nếu ko điền gì mà Signup thì cả form được body-parser thành 
  const email = req.body.email;
  const password = req.body.password; 
  console.log("bcrypt password: \n",bcrypt.hash(password, 12).then(value=>console.log(value)));
  console.log("VD1 bcrypt password CHUỖI rỗng : \n",bcrypt.hash('', 12).then(value=>console.log(value)));
  console.log("VD2 bcrypt password CHUỖI rỗng : \n",bcrypt.hash('', 12).then(value=>console.log(value)));
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email }) //không thể so trùng password được do cùng 3 chuỗi rỗng thì hash ra 3 kết quả khác nhau
        .then(userDoc => {
          if (userDoc) {
            return res.redirect('/signup'); //redirect dành cho userDoc có email đã đăng ký rồi (*)
          }
          return bcrypt.hash(password, 12)
                       //2 then blocks here are only executed if we make it into the hashing mode.//
                       .then(hashedPassword => {
                         //console.log("hashedPassword: \n",hashedPassword)
                         const user = new User({
                             email: email, //nếu email schema required true mà không điền vào thì gửi '' thì email:"" cũng được chấp nhận trong MongoDB
                             password: hashedPassword,
                             cart: { items: [] }
                         });

                         console.log("Save new user to MongoDB")
                         //https://masteringjs.io/tutorials/mongoose/save
                         return user.save();//save() của Mongoose không có tham số function(){console.log("saved user")} sẽ trả về Promise; nếu có tham số thì trả về void
                         //Note: Mongoose's Document.save() trả về Promise, còn Mongoose's Document.save(callback) trả về void
                       })
                       .then(result => {
                          console.log("Kết quả của save task: \n",result)
                          res.redirect('/login'); //redirect dành cho return bcrypt.hash(password, 12); Hiện tại đang báo lỗi "Password required", chứ {*} mà chảy xuống đây là báo lỗi Cannot set headers for ..
                        })
        })
        // if we redirect to '/signup' route, there only is the catch block here for catching errors of which we don't have one
        .catch(err => {
          console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
