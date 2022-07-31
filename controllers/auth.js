 //hàm getLogin, postLogin và postLogout đều dành cho tất cả users cả admins

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
      //có 2 trường hợp: trước khi postLogin và sau khi postLogin , cả 2 TH đều nhận Session views là req.session.views
         /// nhưng sau khi logout xong thì còn req.session.views hay không??

      console.log("session của getLogin ( 2 trường hợp: trước khi postLogin và sau khi postLogin ): \n",req.session); //trả về đối tượng Session đã tạo lúc npm start
      console.log(req.session.isLoggedIn);

      //trường hợp gõ http://localhost:5002/login mà không thông qua http://localhost:5002/ thì chưa có session cookie nào
      let sessionViews=req.session.views? req.session.views:0;  //let sessionViews=req.user? req.session.views:0; là sai vì trước khi postLogin chưa có user chỉ có req.session.views, chỉ có sau khi postLogin thì mới có thêm user và kycedViews
      //console.log("sau khi postLogout thì không còn session tương ứng nữa  \n",sessionViews)
      res.render('auth/login', {
            path: '/login', //để hightlight nav Login khi path là /login
            pageTitle: 'Login', //nếu không nhận được "Logint" sẽ ra "Page Not Found"
            sessionViews:sessionViews,
            isAuthenticated:req.user  //nối tiếp chuỗi khởi đầu từ postLogin,,ok, trang login cũng cần navigation.ejs
      });
};



exports.postLogin = (req, res, next) => {
      //Vì sao trước khi postLogin không có session cookie nào, và MongoDB không có session nào, cho tới khi postLogin??
      console.log("req do client gửi tới , có biến session không ??: \n",req); 
      //https://stackoverflow.com/questions/55558402/what-is-the-meaning-of-bodyparser-urlencoded-extended-true-and-bodypar
      //đầu tiên khi Login, body có {email:'',password:''}
      //It helps you to create object from the form inputs
      //<input type="email" name="email" id="email">
      //<input type="password" name="password" id="password">

      User.findById('62c4c9cce3789b7b623b3ba8')  
          .then(user => { //this is mongoose user inheriting all mongoose methods


            //Đã có req.session do incoming req tới middleware session() , bây giờ là thời điểm gán các biến đánh dấu đã xác thực vào session:

            //trước kia như thẦy NgoTuanAnh nói, middleware session() đã tạo collection sessions nhưng chưa có document nào
            //thì ứng với 1 req sẽ tạo ra 1 session document có dữ liệu {isLoggedIn và user và cookie}   đồng thời cho browser 1 session cookie
            //Important note: hàm session() trong app.js chỉ là để tạo session middleware và sau đó npm start sẽ tạo collection tên "sessions" trên MongoDB và chưa có doc nào,  chỉ có 1 req vào 1 port 5002 và chỉ có req của postLogin thì mới tạo được session document trong "sessions" và gửi res chứa session cookie cho client
             req.session.isLoggedIn=true;

             //CHÌA KHÓA CHỖ NÀY, thử req.user = user thì lúc nào cũng tới màn hình '/' với KYC:false vì lúc đó mất dấu không biết user nào
             req.session.user = user;  
             //Problem là việc thêm property lên MongoDB sẽ chậm hơn việc redirect vì 2 công việc đó là độc lập nhau, dẫn tới trang / chưa có 2 menu của admin vì req.session chưa có user nên có vẻ chưa login 
             //Solution: dùng callback để đảm bảo save trên mongodb trước khi redirect
             req.session.save((err)=>{
                  //if an error exists, but most of the time that should not be the case 
                  console.log(err);
             })
             //Nếu dùng req.user=user thì res.redirect sẽ hủy req trước đó nên user không chuyển xuyên suốt các routes.with session, we can share across request, this is a way of using session to store user mongoose object
             //Tuy nhiên, req.user có thể gọi hàm của class User, còn req.user trên MongoDB chỉ chứa data không chứa methods nào nên không gọi hàm được
             //Do đó kinh nghiệm là trước res.redirect thì đừng dùng biến req để lưu , mà dùng req.session
             res.redirect('/');
             //Tới '/' nhưng req.user không mất đi, vì req gặp session() thì sẽ có req.user ,sẽ luôn nằm trong bất cứ req nào tới app, nhưng req.user sẽ không truy cập các hàm của mongoose được
             //Tuy nhiên cần theo dõi tiếp sau session middleware còn có 1 middleware đón req nữa
          })
          .catch(err => console.log(err));
      //console.log("req sau khi gắn session: \n",req)
};

exports.postLogout = (req, res, next) => {  //cho err là tham số đầu tiên được k
      req.session.destroy(err => { //err chỉ là tham số, không phải if nên res.redirect('/login'); có thể vào callback function
        console.log(err);
        res.redirect('/login');
      });
};

// which is an empty placeholder, nothing in there
exports.postSignup=(req,res,next)=>{};

exports.getSignup=(req,res,next)=>{
      res.render('auth/signup',{
           path:'/signup',
           pageTitle:'Signup',
           isAuthenticated:false
      });
}