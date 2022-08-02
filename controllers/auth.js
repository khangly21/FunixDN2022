const bcrypt= require('bcryptjs'); 

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
      //có 2 trường hợp: trước khi postLogin và sau khi postLogin , cả 2 TH đều nhận Session views là req.session.views
         /// nhưng sau khi logout xong thì còn req.session.views hay không??
      // có 2 sự kiện trỏ tới route '/login' bằng cách res.redirect('/login)
         /// postSignup
         /// postLogout
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

      //sau khi đăng ký Signup thì trong CSDL collection users có id người dùng --> cần findById một cách dynamic
      User.findById('62e7d67be2660d2622f0f371')  
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


exports.postSignup=(req,res,next)=>{
    //we want to extract the information from the incoming request, với sự trợ giúp của body-parser middleware which turn input into js object, gắn vào req.body
    const email=req.body.email; //see if we find a user where the email field holds a value equal to the email we're extracting here.
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;
    
    User.findOne({email:email})
        .then(userDocumentModel=>{
            if(userDocumentModel){
                //do have a user then I certainly don't want to create a new one with the same e-mail.
                return res.redirect('/signup'); 
            }
            
            return bcrypt.hash(password,12);  
            
        })
        .then(futureHashedPassword=>{
            console.log("Beginning: futureHashedPassword khi signup với email đã có trong CSDL Như test2@test.com: \n",futureHashedPassword) //undefined, vì res.redirect rồi nhưng vẫn thực hiện then() và vấn đề là bcrypt.hash(password,12)  chưa bao giờ được thực hiện
            
            const user=new User({
                //left side is the field, right side is the data extracted from req.body 
                email:email,
                password:futureHashedPassword, //with that, we dramatically improve the performance
                //tới đây thấy class User không có password, nên có thể sửa schema lại để tạo class khác có các thuộc tính email,password, mặc dù lúc đầu khi users collection rỗng thì đã mặc định tạo user đầu tiên có {name,email,cart}
                cart:{items:[]}
            });
            //Nếu để trống form Signup mà submit luôn thì vi phạm Schema User , lúc đó không có user model nào được tạo
            console.log(user); //cố tình log 1 object as string, có bị báo lỗi là [object Object] ??
            /*
                  //Mặc dù futureHashedPassword bị undefined, nhưng vẫn ra kết quả là:
                  {
                      email: 'test2@test.com',
                      cart:{items:[]},
                      _id:new ObjectId("62e8538e...")
                  }
                  ServerResponse.header: Cannot set headers after they are sent to the client   
                  ok,user saved
            */
            return user.save(()=>{console.log("đã lưu")}); //IMPOTANT NOTE: callback của save() có thể là function(){console.log("ok, user saved. I am the callback happening before the next then")} NHƯNG SẼ BÁO LỖI "Error: Cannot set headers after they are sent to the client"
            //return a Promise object. But WHY? để đảm bảo async save() mất thời gian thực hiện xong đã rồi nếu không có lỗi nào thì sẽ chạy callback trong then tiếp theo
            // return this so that we can chain another then block here which will be called once this save action completed (xem bài Two tiny improvements)
        })
        .then(result=>{
            console.log("result sau khi save: \n",result)//undefined
        })
        .then(
            result=>{
                console.log("result from nothing: \n",result)
                return User.findOne({email:'test2@test.com'})
            }
        )
        .then(
            //Không có lỗi nào thì vào callback trong then()
            //then trước đó trả về đối tượng res.redirect('/') || user.save() 
            //thời điểm này tui biết user did sign up
            
            result=>{
                 // this function here will be executed once saving is done.
                 console.log("result của User.findOne : \n",result) //undefined
                 console.log("OK. đã save xong")
                 res.redirect('/login')  //ERROR CHỖ NÀY, VÌ ĐÃ REDIRECT qua 'signup' rồi mà còn redirect qua /login nữa !?
                 //because after signing up, you need to login.
                 //I also have no server error (500)
            }
            
        )
        .catch(err=>console.log(err))  //we also might get an error which I'll simply log here (nếu không có err object nào được throw ra thì err undefined do biến này không chứa địa chỉ của đối tượng nào)

};


// exports.postSignup = (req, res, next) => {
//     console.log(req.body);
//     const email = req.body.email;
//     const password = req.body.password;
//     const confirmPassword = req.body.confirmPassword;
//     User.findOne({ email: email })
//       .then(userDoc => {
//         if (userDoc) {
//           return res.redirect('/signup');
//         }
//         return bcrypt.hash(password, 12);
//       })
//       .then(hashedPassword => {
//         const user = new User({
//           email: email,
//           password: hashedPassword,
//           cart: { items: [] }
//         });
//         console.log(user);
//         return user.save(function(){console.log("ok, user saved")});
//       })
//       .then(result => {
//         res.redirect('/login');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
  
exports.getSignup=(req,res,next)=>{
      res.render('auth/signup',{
           path:'/signup',
           pageTitle:'Signup',
           isAuthenticated:false
      });
}