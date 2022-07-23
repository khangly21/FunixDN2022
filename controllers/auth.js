exports.getLogin = (req, res, next) => {
   
      res.render('auth/login', {
        path: '/login', //để hightlight nav Login khi path là /login
        pageTitle: 'Login',
        isAuthenticated:req.isLoggedIn
        //I don't pass any other data here
      });
 
};

//it's a really simple controller action which render view auth/login I(EJS template + data ==> HTML ) to page '/login' requested
// will render the login page with the appropriate title.

exports.postLogin = (req, res, next) => {
   //I will get my login data, e-mail, password and so on and I don't really care about that data, so I'll just assume the user is logged in and I will then redirect to just slash.
    req.isLoggedIn= true;  //req-res chưa kết thúc. tới nay thì req có đồng thời 2 thuộc tính req.isLoggedIn và trq.user 
    
    //set to true when we do log in//nghĩa là at the npm start it is not set , be undefined which is treated as false and that is the information I need
   // I'll add isAuthenticated and store that value to every res.RENDER call hay res.status(404).render() in controllers >> admin.js , shop.js, auth.js : getProducts, getAddProduct, getEditProduct , error.js

   //Problem: I update is logged in here in the request and what happens to the request once I send a response (VD res.redirect)??
      /// Well the request is dead, it's done (the req-res cycle!!). Đó là lý do isAuthenticated sẽ undefined trong navigation.ejs và 2 menu trên không bao giờ hiện ra
      ///Không như app.js chứa req.user= user tiếp theo là next() giúp duy trì req,,
         ////So the data we store here is used in the same request cycle, in our route handlers in our controllers
          
      ///this is deliberately designed that way and therefore any data we store here can be used AS LONG AS AS  (cho tới khi) we are working on the SAME request.
   res.redirect('/'); //https://codesource.io/node-js-express-redirect-example/

   
   //the redirection creates a brand new request (whenever we visit a different page like here where we do get redirected res.redirect('/');) and this is super important to understand. We reach controller action getIndex  in the end and there, we do render the 'shop/index' view , rõ ràng 'shop/index' view là một brand new render request/call khác 'auth/login' view sau khi getLogin.

   //res.redirect là phản hồi yêu cầu browser request for '/' page rồi kết thúc cycle. Cycle mới là req for '/' page

   //hiểu request là yêu cầu từ client lên server và response là server trả kết quả về cho client

   //Chúng ta có hai phương thức (2 cách) để gửi request từ client lên server đó là sử dụng phương thức GET và phương thức POST.

   //Request có thể hiểu nhanh là thông tin gửi từ client lên server.

   //Khi bạn gửi request thì sẽ có rất nhiều thông tin đính kèm theo bao gồm các thông tin của trình duyệt đang sử dụng, địa chỉ IP của mạng mà máy tính bạn đang kết nối và nhiều thông tin khác

   //Facts: "Cơ chế là We're working with totally separate requests , thậm chí là các req từ cùng một người vì requests made from the same IP address are treated as totally independent requests " and that is important because your application, your page will have hundreds of users and obviously the requests of all these users are not related to each other (otherwise they could maybe look into data that they shouldn't see). Requests are not seen in a bigger context or anything like thatvand this is a good thing,

   //Claimer corner:  not allow multiple accounts (users with same IP address). Lý do là với không dùng req để định danh người dùng được (cùng IP address nhưng các req khác nhau có thể tới từ cùng 1 người hay nhiều người do đó không phân biệt được fraud), nên phải dùng account. DO đó định danh bằng 1:1 giữa IP adress và Account


};