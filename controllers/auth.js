exports.getLogin = (req, res, next) => {
      //Nếu req.postLogin thực hiện thiết lập session rồi thì req.session xác định, nếu không thì undefined 
      //khi req.session xác định, thì nhấn Login button , hay refresh lại trang đăng nhập  http://localhost:3000/login
      //thực hiện 2 lần thì thấy Session object được log 2 lần
      //https://stackoverflow.com/questions/8064318/how-to-read-a-httponly-cookie-using-javascript
      console.log("session của getLogin: \n",req.session); //trả về đối tượng Session đã tạo lúc npm start
      console.log(req.session.isLoggedIn);//sau đó login lần nữa, thấy có Session object và isLoggedIn thì undefined, vì nó chỉ được xác định trong lần đầu tiên postLogin
    
      res.render('auth/login', {
            path: '/login', //để hightlight nav Login khi path là /login
            pageTitle: 'Login',
            isAuthenticated:false
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