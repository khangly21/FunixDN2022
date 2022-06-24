const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//chỉ connect MongoDB Cloud 1 lần ở app.js khi khởi động và không đóng kết nối, thì sau này vd product.js cũng có kết nối tới MongoDB không cần gọi hàm connect() nữa
const mongoConnect=require('./util/database').mongoConnect;  //.congoConnect là import hàm từ database.js, ghi vầy do có 2 lựa chọn export trong database.js 
//And with that now we're not only connected but we should also be able to insert a new product already (trong product.js)=> WHY??

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(  (req,res,next) => {   //Ctrl K C   sẽ comment out cả block trong VSC , muốn uncomment thì Ctrl K U
   next(); //không có next thì all incoming requests will die here
})


// //vì sao tác giả luôn dùng app.use() để phối hợp router.get/post()
app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

//This function is asynchronous (https://stackoverflow.com/questions/33222074/about-app-listen-callback)
app.listen(3000); //do để app.listen(3000 vào trong callback của mongoConnect thì app không nhận được GET req từ /admin/add-product

//CÁCH GỌI HÀM callback NÀY CÓ GÌ SAI???
let z="Dccddc";
mongoConnect((z)=>{
    console.log(z);
    //https://www.freecodecamp.org/news/javascript-callback-functions-what-are-callbacks-in-js-and-how-to-use-them/
});

/*
    mongoConnect()  //dùng khi không có callback làm tham số

    //nếu định nghĩa hàm mongoConnect có callback làm tham số thì 
    mongoConnect(()=>{

    })
*/
 
/*
     mongoConnect(){
         app.listen(3000); //không kết nối
     }
*/