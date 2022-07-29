 //hàm getLogin, postLogin và postLogout đều dành cho tất cả users cả admins

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
      //có 2 trường hợp: trước khi postLogin và sau khi postLogin , cả 2 TH đều nhận Session views là req.session.views
         /// nhưng sau khi logout xong thì còn req.session.views hay không??

      console.log("session của getLogin ( 2 trường hợp: trước khi postLogin và sau khi postLogin ): \n",req.session); //trả về đối tượng Session đã tạo lúc npm start
      console.log(req.session.isLoggedIn);

      //trường hợp gõ http://localhost:5002/login mà không thông qua http://localhost:5002/ thì chưa có session cookie nào
      let sessionViews=req.session.views? req.session.views:0;  //let sessionViews=req.session.user? req.session.views:0; là sai vì trước khi postLogin chưa có user chỉ có req.session.views, chỉ có sau khi postLogin thì mới có thêm user và kycedViews
      //console.log("sau khi postLogout thì không còn session tương ứng nữa  \n",sessionViews)
      res.render('auth/login', {
            path: '/login', //để hightlight nav Login khi path là /login
            pageTitle: 'Login', //nếu không nhận được "Logint" sẽ ra "Page Not Found"
            sessionViews:sessionViews,
            isAuthenticated:req.session.user  //nối tiếp chuỗi khởi đầu từ postLogin,,ok, trang login cũng cần navigation.ejs
      });
};

/*
//không tồn tại trang này, mà res.redirect tới trang login
exports.getLogout=(req,res,next)=>{
      res.render('auth/logout',{
            path: '/logout', //để hightlight nav Login khi path là /logout
            pageTitle: 'Logout', //nếu không nhận được "Logout" sẽ ra "Page Not Found", VD render view 'aut/logout'
            isAuthenticated:req.session.user  //ok, trang logout cũng cần navigation.ejs
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


//it's a really simple controller action which render view auth/login I(EJS template + data ==> HTML ) to page '/login' requested
// will render the login page with the appropriate title.

exports.postLogin = (req, res, next) => {
      //Vì sao trước khi postLogin không có session cookie nào, và MongoDB không có session nào, cho tới khi postLogin??
      console.log("req do client gửi tới , có biến session không ??: \n",req); 
      User.findById('62c4c9cce3789b7b623b3ba8')  
          .then(user => {
            //Đã có req.session do incoming req tới middleware session() , bây giờ là thời điểm gán các biến đánh dấu đã xác thực vào session:

            //trước kia như thẦy NgoTuanAnh nói, middleware session() đã tạo collection sessions nhưng chưa có document nào
            //thì ứng với 1 req sẽ tạo ra 1 session document có dữ liệu {isLoggedIn và user và cookie}   đồng thời cho browser 1 session cookie
            //Important note: hàm session() trong app.js chỉ là để tạo session middleware và sau đó npm start sẽ tạo collection tên "sessions" trên MongoDB và chưa có doc nào,  chỉ có 1 req vào 1 port 5002 và chỉ có req của postLogin thì mới tạo được session document trong "sessions" và gửi res chứa session cookie cho client
             req.session.isLoggedIn=true;
             req.session.user = user;  //Nếu dùng req.user=user thì res.redirect sẽ hủy req trước đó nên user không chuyển xuyên suốt các routes.with session, we can share across request, this is a way of using session to store user mongoose object
             
             res.redirect('/');
          })
          .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {  //cho err là tham số đầu tiên được k
      req.session.destroy(err => { //err chỉ là tham số, không phải if nên res.redirect('/login'); có thể vào callback function
        console.log(err);
        res.redirect('/login');
      });
};
