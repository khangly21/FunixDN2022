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
   //trong session object we can add any attribute / key we want
   console.log("session của postLogin: \n",req.session);  //vẫn là session đã tạo ở npm start
   req.session.isLoggedIn=true;
   res.redirect('/'); //https://codesource.io/node-js-express-redirect-example/
   console.log("session của postLogin: \n",req.session); //vẫn là session đã tạo ở npm start
   console.log(req.session.isLoggedIn); // vẫn là session đã tạo ở npm start, có thêm thuộc tính isLoggedIn true

   
   //the redirection creates a brand new request (whenever we visit a different page like here where we do get redirected res.redirect('/');) and this is super important to understand. We reach controller action getIndex  in the end and there, we do render the 'shop/index' view , rõ ràng 'shop/index' view là một brand new render request/call khác 'auth/login' view sau khi getLogin.

   //res.redirect là phản hồi yêu cầu browser request for '/' page rồi kết thúc cycle. Cycle mới là req for '/' page

   //hiểu request là yêu cầu từ client lên server và response là server trả kết quả về cho client

   //Chúng ta có hai phương thức (2 cách) để gửi request từ client lên server đó là sử dụng phương thức GET và phương thức POST.

   //Request có thể hiểu nhanh là thông tin gửi từ client lên server.

   //Khi bạn gửi request thì sẽ có rất nhiều thông tin đính kèm theo bao gồm các thông tin của trình duyệt đang sử dụng, địa chỉ IP của mạng mà máy tính bạn đang kết nối và nhiều thông tin khác

   //Facts: "Cơ chế là We're working with totally separate requests , thậm chí là các req từ cùng một người vì requests made from the same IP address are treated as totally independent requests " and that is important because your application, your page will have hundreds of users and obviously the requests of all these users are not related to each other (otherwise they could maybe look into data that they shouldn't see). Requests are not seen in a bigger context or anything like thatvand this is a good thing,

   //Claimer corner:  not allow multiple accounts (users with same IP address). Lý do là với không dùng req để định danh người dùng được (cùng IP address nhưng các req khác nhau có thể tới từ cùng 1 người hay nhiều người do đó không phân biệt được fraud), nên phải dùng account. DO đó định danh bằng 1:1 giữa IP adress và Account


};