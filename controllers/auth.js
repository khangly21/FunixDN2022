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
  //extract two pieces of information I need for signing a user in.
  const email=req.body.email;
  const password=req.body.password;
  //sẽ không dùng passive User.findById('5bab316ce0a7c75f783cb8a8')
  // there should be only one user with an email in the database and I'll find the user by looking for the email field in the documents,  comparing it to the e-mail value we are extracting here.
  User.findOne(
    //find one document
    //filter query
    {email:email}
  )//hàm findOne trả về Callback
      .then(user=>{
        //user là giá trị tương lai mà pending Promise ở fineOne sẽ trả về
        //pending Promise có thể trả về fulfilled (tìm thấy hay không tìm thấy user, nếu không tìm ra thì biến tương lai user nhận undefined) hay rejected (catch error)
        if(!user){
           //I don't have a user here, so if user is undefined  
           //I didn't find a user in the database and then I can simply return here
           //log in failed
           return res.redirect('/login');
        }

        //we passed the above if branch, the e-mail exists but now we need to validate the password of course
        //We'll do this with the bcrypt package again because the password is of course stored in a hashed form
        //and I mentioned that we can't reverse this, so how can we now compare the password in the req.body with the hashed form in MongoDB?
        //https://stackoverflow.com/questions/71844946/why-bcrypt-comparesync-always-return-false

        //async compare the given data (data to compare) with a given hash (data to be compared)
        bcrypt.compare(password,user.password)//vì là implicit async function nên nó bị bắt buộc phải trả về một Promise (if callback has been omitted),vì vậy dùng then() block và catch() block để nhận kết quả fulfilled (dù password có matches hay không cũng ok) hoặc rejected
              //không có then() mà chỉ có bcrypt.compare() thì Promise trả về bởi compare sẽ <pending>
              .then(doMatch=>{ //doMatch là true (nếu matching) hoặc false (nếu non-matching)
                  //Mongoose isModified() cũng trả fulfilled Promise với true hay false
                  //I want to check whether we were successful.
                  //In both a matching and a non-matching case for password, we make it into the then block and result will be a boolean that is true if the passwords are equal
                  //will be false if they are not equal.

                  //here we can check if do match is true, khi đó if(true)
                  if(doMatch){
                      //doMatch is true
                      /*
                          that means the passwords are equal, the user entered a valid password and then we could return to not
                            execute any other code,
                      */

                      //các Lab trước bất cứ req nào tới API app cũng sẽ có lưu session (trong session lưu cookie) nhưng chưa lưu trên MongoDB, cho tới khi lưu các biến khác cookie như user, isLoggedIn vào session thì session mới được lưu vào MongoStore
                      //Lab này tác giả dùng req.session.save()

                      //Once my user is loggedIn (verification done between POST information and DB) i want to save data in a session using expressjs/session.
                      req.session.isLoggeIn=true; //hoặc req.session.authenticated=true
                      req.session.user=user;  // thay vì lưu từng  req.session.email = email; req.session.password = password;
                      
                      //https://www.tabnine.com/code/javascript/functions/express-session/Session/save
                      //redirect in that session after we saved it successfully.
                      return req.session.save(err=>{
                          console.log(err);
                          res.redirect('/'); //không cần chữ "return" để return an object, we don't need to return then because after this line, this line can't be reached because this line is in a callback in a different function.
                      })
                      //store the user in the session because we still need the user object and the user here keep in mind is the user we retrieved from the database and we want to save that session
                      //user we retrieved from the database  (chứ không phải từ MongoStore chỉ lưu các data và không lưu các hàm Mongoose)  nên sẽ có các Mongoose methods nằm trong các req.session.save()  ??
                      
                      //https://www.geeksforgeeks.org/express-js-res-redirect-function/  it returns an object
                  }
                  //doMatch is false,  the user entered an invalid password.
                  return res.redirect('/login');
              })
              .catch(err=>{
                //không biết err chứa pointer chứa địa chỉ của lỗi object , hay err là undefined vì chưa được gán gì hết
                //nên trong hàm này có thể xét if(err)
                //vì catch sẽ nhận các vấn đề như một Promise phía trên bị rejected, network problem, type error... và catch trả về 1 Promise
                //const accessToken = await getAccessToken().catch(() => null); nghĩa là arrow function có implicit return, In your code snippet, if getAccessToken() is rejected, catch() will be entered, null will be the value which gets returned to accessToken.
                     ///async makes a function return a Promise
                        //// do đó khi gặp async function thì biết nó sẽ return Promise
                     ///await makes a function wait for a Promise 
                        //// VD trên thì hàm tổng quát phải chờ getAccessToken() trả về Promise hay catch() trả về Promise
                        //// câu hỏi là phía sau catch không còn then nào, vậy Promise mà catch trả về có bị pending hay không
                //Now important, with bcrypt.compare() we'll only face an error in catch() if something goes wrong, not if the passwords do not match (password matching hay không matching thì Promise cũng fulfilled vào trong then() )
                console.log(err);
                res.redirect('/login');
              })
              //So with all that in place, we should be able to sign in if we do enter a valid password,
      })
      .catch(err => console.log(err));

      //Experience: không nên redirect tới route '/login' nhiều quá vì nếu có lỗi tới /login sẽ không biết ở /login nào
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
                       //2 then blocks here are ONLY executed if we make it into the hashing mode.//
                       //return bcrypt.hash(password, 12)  sẽ trả về Promise (if callback has been omitted) with resulting hash (vì vậy không thể có chuyện có hash hay không hash trong 1 fulfilled Promise như TH matching hay nonmatching trong bcrypt.compare )
                       //bcrypt.hash(this.password, salty, (err, hash) => {  } )  //xem: https://stackoverflow.com/questions/65360482/mongoose-bcrypt-error-data-and-hash-arguments-required
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
