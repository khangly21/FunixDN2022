const path = require('path');
const express = require('express');

const bodyParser = require('body-parser') ;

const errorController = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;

const User=require('./models/user');

const app = express();

//views
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log("Chuẩn bị tìm user theo id: ",req.url);
    User.findById('62b8211988e99bcbaf8e97ff') 
      .then(user=>{ //user này chỉ trỏ tới data trên mongo, không có method nên phải new instance dựa trên data fetch về
        console.log("TRƯỚC khi tạo User instance từ dữ liệu Mongo");
        req.user= new User(user.name,user.email,user.cart,user._id);
        console.log("SAU khi tạo User instance từ dữ liệu Mongo");


        console.log("trước");
        console.log("req.user có thêm cột cart là: \n",req.user); 
        //vì sao dòng này bị log tới 10 lần khi GET req http://localhost:3000/ ?? Xem render thì có 9 hình không hiện ra do sai giá trị, 6 hình hiện thành công
            /// dĩ nhiên lần 1 là do localhost:3000/ tới API này trước khi next tới API getIndex
            /// sau khi xem xét req.url tới đây thì thấy có 9 hình mà express lấy từ mongodb có imageUrl sai (VD image:'cena') (ngoài ra thì url đúng như imageUrl :"https://pbs.twimg.com/media/EcVrxIlWsAsH0N6?format=jpg&name=small" sẽ res.status 200) thì trình duyệt sẽ req tới API này với localhost:3000/cena 
        console.log("sau  \n "); //  thêm \n chính là line break trong nodejs
        
        if(user){
          next(); //chỉ được chạy 1 lần do hành động getIndex chỉ được GET req 1 lần duy nhất, nhưng trước khi xử lý GET req '/' thì API này chặn đầu tiên
          console.log("HẬU  NEXT");
        }
        
      })
      .catch((err)=>{ 
        console.log("Hello, I caught 1 error: \n",err);
        throw "Some TypeError or Reference Error in this Promise";
      });  
  
});


app.use('/admin', adminRoutes); 
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
 
  app.listen(3000)

})
