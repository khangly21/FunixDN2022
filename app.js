const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//import database.js để app.js chạy thì kết nối MongoDB luôn
//will import a function because I'm exporting a function in database.js.
const mongoConnect=require('./util/database').mongoConnect; 

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(  (req,res,next) => {   //Ctrl K C   sẽ comment out cả block trong VSC , muốn uncomment thì Ctrl K U
    // User.findByPk(1)
    //    .then(
    //        user=>{
    //            console.log("giá trị của model instance user sẽ không chỉ có đối tượng nhận được, nên gọi user là Sequelize object with magic sequelize features: \n",user); //sẽ không chạy sau khi npm start vì Express app đang listen for req, chưa có req nào tới hết
    //            //sync().then().then().catch() cho phép đảm bảo luôn có 1 user available trong CSDL
    //            //do đó this fulfilled Promise sẽ luôn tìm thấy user, nên không xét if(!user) ở đây 
               
               
               
    //            req.user=user; //vì sao user.save() thì ok, còn req.user không có suggest save() ??
               
    //            next(); //clever!!! next() giúp program control chạy tiếp và nếu phát hiện đường dẫn cụ thể matching thì sẽ xử lý luôn!! VD http://localhost:3001/admin/products thì cả 3 routes sau đều có handler chạy là: '*' =next()=> app.use(  (req,res,next) => {}) => app.use(/admin,adminRouter)+router.get('/products', adminController.getProducts);
               
    //        }
    //    )
    //    //Mặc dù lệnh next() tới route kế tiếp, nhưng nếu có err thì vẫn catch(err), đó là cách chạy của next()
    //    .catch(err=>console.log(err)); //err != null , log() sẽ truy cập giá trị của biến đối tượng err
})


// //vì sao tác giả luôn dùng app.use() để phối hợp router.get/post()
app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

//gọi thực thi hàm với tham số là một hàm callback
//hàm callback sẽ được gọi thực thi sau khi {kết nối thành công + lưu trữ được kết nối trong _db}
mongoConnect((connected_mongoclient_instance)=>{
    //run app.listen sau khi once connected successfully
   console.log(connected_mongoclient_instance); //undefined vì trong database.js hàm callback() chưa có tham số, đáng lẽ là callback(connected_mongoclient_instance);
   app.listen(3000);
    //npm start sẽ gặp app crashed. WHY?
       ///when I bring up (đề cập) my server, we do actually register all our routes here and in the routes files, we dive into our controllers and in our controllers, then in models are using that sequelize object which simply does not exist anymore
       /// so now So now we got no working routes for the moment but this means that we can now at least connect
    //Problem:
       
      
});