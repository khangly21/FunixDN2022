const User = require('../models/user');

exports.getLogin = (req, res, next) => {
      //Nếu req.postLogin thực hiện thiết lập session rồi thì req.session xác định, nếu không thì undefined 
      //khi req.session xác định, thì nhấn Login button , hay refresh lại trang đăng nhập  http://localhost:3000/login
      //thực hiện 2 lần thì thấy Session object được log 2 lần
      //https://stackoverflow.com/questions/8064318/how-to-read-a-httponly-cookie-using-javascript
      console.log("session của getLogin: \n",req.session); //trả về đối tượng Session đã tạo lúc npm start
      console.log(req.session.isLoggedIn);//sau đó login lần nữa, thấy có Session object và isLoggedIn thì undefined, vì nó chỉ được xác định trong lần đầu tiên postLogin
    
      res.render('auth/login', {
            path: '/login', //để hightlight nav Login khi path là /login
            pageTitle: 'Login', //nếu không nhận được "Logint" sẽ ra "Page Not Found"
            isAuthenticated:req.session.isLoggedIn  //ok, trang login cũng cần navigation.ejs
      });
};

/*
//không tồn tại trang này, mà res.redirect tới trang login
exports.getLogout=(req,res,next)=>{
      res.render('auth/logout',{
            path: '/logout', //để hightlight nav Login khi path là /logout
            pageTitle: 'Logout', //nếu không nhận được "Logout" sẽ ra "Page Not Found", VD render view 'aut/logout'
            isAuthenticated:req.session.isLoggedIn  //ok, trang logout cũng cần navigation.ejs
      })
}
*/

/*
exports.postLogout=(err,req,res,next)=>{
      //Nhớ xóa tất cả session trước khi redirect tới trang login, do đó res.redirect('/login'); pải nằm trong hàm callback
      
      //method built-in trong session package, takes a function which we pass to it which will be called once it's done destroying the session
      //https://stackoverflow.com/questions/43230962/req-session-destroy-not-working-in-nodejs
      req.session.destroy((e)=>{
          //https://www.tabnine.com/code/javascript/functions/express-session/Session/destroy
          // in here, all the session object's data will be lost because the session was destroyed. Do đó request session will then not be available anymore because we got rid of that session.
          console.log(e); //đây là error mặc định là param thứ nhất của cb throw bởi session.destroy(), không phải err của express middleware
         
          
          //we also get a potential destroy error here which we can try to log to the console.
      });
      console.log("All sessions trong phiên này đã bị hủy")
      res.redirect('/login');
      
      //with that we have the post log out button registered.

}
*/

/*
//Nhắc lại sai lầm cùng đoạn trước đó
//Mentor nguyentuananh: "destroy nó sẽ gọi callback và nếu có lỗi thì nó sẽ gọi callback mà b đã viết và pass cái lỗi đó vào param thứ nhất. Nơi mà b đặt là err nhé, Nếu chỗ đó k có lỗi thì err sẽ là undefined. Trong cb thì b đã log err đó ra nè"

//Mentor nguyentuananh: Trong express Midleware thì mối req gửi lên thì param1 lại là req. Nên b k làm v được nè
exports.postLogout = (error,req, res, next) => {  //cho err là tham số đầu tiên được k
      req.session.destroy(err => { //err chỉ là tham số, không phải if nên res.redirect('/login'); có thể vào callback function
        console.log(err);
        res.redirect('/login');
      });
};
*/

exports.postLogout = (req, res, next) => {  //cho err là tham số đầu tiên được k
      req.session.destroy(err => { //err chỉ là tham số, không phải if nên res.redirect('/login'); có thể vào callback function
        console.log(err);
        res.redirect('/login');
      });
};

//it's a really simple controller action which render view auth/login I(EJS template + data ==> HTML ) to page '/login' requested
// will render the login page with the appropriate title.

exports.postLogin = (req, res, next) => {
      
      console.log("req do client gửi tới , có biến session không ??: \n",req); 
      User.findById('62c4c9cce3789b7b623b3ba8')  
          .then(user => {
             req.session.isLoggedIn=true;
             req.session.user = user;  //Nếu dùng req.user=user thì res.redirect sẽ hủy req trước đó nên user không chuyển xuyên suốt các routes.with session, we can share across request, this is a way of using session to store user mongoose object
             
             res.redirect('/');
          })
          .catch(err => console.log(err));
};