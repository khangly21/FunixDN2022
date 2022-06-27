const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User=require('./models/user');

//Express application onject access/reference
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Middleware với access của user lưu trong req.user
// a middleware function app.use((req, res, next) =>{} with no mount path. The function is executed every time the app receives a request.
//next là access/ref to the next middleware function , trường hợp này hàm mdlw kế tiếp là adminController.getAddProduct
app.use((req, res, next) => {
  //find a user by ID from a central place (MongoDB), I can now search for that ID and I convert that in the user model, remember that is why I can use a string here.
  //the idea here of course is to show you how you can extract the user in one central place (collection users) and then reuse (tái sử dụng) it in any other route 
  //Later once we get an authentication, we'll manage that user a bit differently.

  /*
    if (id) {
      // do something
    } 
  */
 //Không cần xét if trên do chắc chắn id 62b8211988e99bcbaf8e97ff có mặt trong CSDL
    User.findById('62b8211988e99bcbaf8e97ff') //trên mongoDB thì _id:ObjectId("62b8211988e99bcbaf8e97ff"), ở đây tham số phải là string id
      //sau khi find ra thì có user
      //then() này mất thời gian chờ đợi User.findById('62b8211988e99bcbaf8e97ff') , nên control sẽ thực hiện next() thứ hai
      .then(user=>{
        //debug
        console.log("Hi am app.use with no route path");
        //user chắc chắn khác null và khác undefined, vì đã manually create document này trên Mongo collection users 
        //lưu access/reference tới đối tượng user (I get access to my user)

        console.log("User đầu tiên trong bảng users là: \n",user);
        /*
          {
            _id: 62b8211988e99bcbaf8e97ff,  //không phải string, mà là kiểu object
            name: 'max',
            email: 'max@example.com
          }
        */

        console.log(typeof(user._id)); //object

        //Lưu access/reference của đối tượng user vào req.user để tái sử dụng nhiều nơi
        req.user=user;
        //Rõ ràng _id trong vế phải có kiểu ObjectId, bậy nếu _id được extract thì có kiểu gì? ObjectId bị converted thành string
        console.log("có phải string?: \n",typeof(req.user._id)); //object
         
        ////Mentor NgoTuanAnh: nếu có user (console.log ) được thì next đầu tiên chạy pass control qua matching route khác luôn, không chạy next kế nữa 
        console.log("ĐÂY LÀ NEXT ĐẦU TIÊN NHÉ!");
        
        next(); //async và tốn thời gian hơi lâu, nên console.log("I am searching for the next middleware") rồi console.log("Hello I AM then() after the 1st  NEXT !!! "); ra kết quả trước, sau đó next này mới bị báo lỗi
        //Not complete the req here, next is basically just a callback, It passes control to the next matching route. you might look up the user in the database if an id was given
        //https://dev.to/oaluna/getting-to-know-node-js-part-v-2deh
        //then the lines which are below return next() won’t be executed because it will jump out the callback immediately and the code below return next() in the callback will be unreachable. 
        console.log("I am searching for the next middleware")
      })
      .then(result=>{ //dù đã gọi next() ở then trước nhưng not done req-res cycle

        //https://www.geeksforgeeks.org/when-to-use-next-and-return-next-in-node-js/
        //https://www.geeksforgeeks.org/express-js-res-render-function/
        //https://stackoverflow.com/questions/26307920/res-json-cant-set-headers-after-they-are-sent
        console.log("Hello I AM then() after the 1st  NEXT !!! "); //works with logged "Hello world"
      })
      .catch((err)=>{
        console.log("Hello, error here: \n",err)
        throw "error here, help";
      });  //nếu .catch(err) thì ReferenceError: err is not defined . Thử nghiệm .catch(err=>{}); do mentor ngotuananh đề xuất
      //now we're at least prepared to set up a connection between our product and our user which we can use later.
  
    console.log("ĐÂY LÀ NEXT THỨ HAI NHÉ!"); //debug async, nếu next này chạy trước sẽ log dòng này
    //next();   //nếu có next ở đây thì báo lỗi duplicate sending view "getAddProduct" to client: Cannot set headers after they are sent to the client
});
//app.use() to mount a path to the Express object.
app.use('/admin', adminRoutes); //adminController.getAddProduct là the next middleware function whose access is stored in the next object in


app.use(shopRoutes); //shopRoutes is middleware


app.use(errorController.get404);

//Tóm lại: To load the middleware function, call app.use(), specifying the middleware function (https://stackoverflow.com/questions/5384526/javascript-node-js-next)

mongoConnect(() => {
  //Đã kết nối tới:
    ///srvHost: 'khangserver0.w0azxjp.mongodb.net'
    ///dbName: 'test'
  //add some code to see if a user with a certain ID exists

  //Không cần check exists vì trên mongo tui manually add new user nên chắc chắn nó tồn tại, nên không cần if(user)
  app.listen(3005); //khi npm start, có thể do page loading chậm nên xuất hiện "Page not found"
});
