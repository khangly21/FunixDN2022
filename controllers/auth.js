exports.getLogin = (req, res, next) => {
      console.log(req.get('Cookie')); //giả sử có cookie hay khác undefined, thì now we could extract that value for example by splitting on the semi-colon and then taking the second value in that array

      console.log(Array.isArray(req.get('Cookie'))); //false

      let isLoggedIn;
      if(req.get('Cookie')){
         isLoggedIn=req
            .get('Cookie')
            .split('=')[1] === 'true'; 

         console.log(typeof(isLoggedIn))  //string
         console.log(isLoggedIn);//false
         //Như vậy isLoogedIn là 1 chuỗi 'false'. Khi if(isAuthenticated) bên trong navigation.ejs thì bí mật là: false is sent as text and text is always treated as true
         //isLoggedIn = "false"  (chuỗi thì if(chuỗi) is evaluated as true)
         // do đó thêm so sánh chuỗi để isLoggedIn trả về boolean value

        
      }
    
      res.render('auth/login', {
            path: '/login', //để hightlight nav Login khi path là /login
            pageTitle: 'Login',
            isAuthenticated:isLoggedIn  //req.isLoggedIn là sai, không hiện ra 2 menu trong navigation.ejs
            //now I have that isLoggedIn information which I can pass to isAuthenticated, tới navigation.ejs của view auth/login
            //khi navigate tới menu khác rồi trở lại getLogin, vẫn nhận được isLoggedIn=true
      });
 
};

//it's a really simple controller action which render view auth/login I(EJS template + data ==> HTML ) to page '/login' requested
// will render the login page with the appropriate title.

exports.postLogin = (req, res, next) => {
   //name of the header is Set-Cookie và gán giá trị cho nó là 1 key:value pair
   res.setHeader('Set-Cookie','loggedIn=true')
   //test bằng cách nhấn Login button rồi vào Developer tool >> application  >> cookie 
        /// some cookies will be set by third party plugins, chrome extensions and so on but you will also see loggedIn=true
        /// Cơ chế: Lần đầu tiên khi postLogin tới localhost:3000, thì Response sẽ gửi cookie gắn vào browser. Lần sau khi getProducts thì browser mặc định gửi cookie tới localhost:3000 
        /// Kết quả: now this cookie is not only set but the browser by default sends it to the server with EVERY request from the host http://localhost:3000 (tương tự chức năng trước kia khi bất cứ req nào tới thì nodejs lưu req.user=user cho tất cả các middleware giữa req và res sử dụng)
           //// VD click Products và trong Developer tool >> Network >> Doc >> xem Request Headers thấy Cookie nội dung loggedIn=true
      
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