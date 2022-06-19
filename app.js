const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database'); //tái sử dụng sequelize nhiều trang khác nhau, nên tập trung 1 chỗ để gọi
const Product=require('./models/product');
const User=require('./models/user'); 

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(  (req,res,next) => { 
    User.findByPk(1)
        .then(user=>{
            req.user=user; 
            next(); 
        })
       .catch(err=>console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


//cấu trúc association trong Udemy video
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})  
User.hasMany(Product); 


/*
//cũng TypeError: req.user.createProduct is not a function
User.hasMany(Product); 
Product.hasOne(User);
*/
//then you have to sync these declarations
sequelize
    .sync() 
    .then(result=>{ 
        return User.findByPk(1)
    })
    .then(user=>{
            if(!user){
                return User.create(
                    {
                        name:'Max',
                        email:'test@test.com'
                    }
                );
            }
            return user; 
        }
    )
    .then(user=>{
            //console.log(user); 
            app.listen(3000); 
        }
    )
    .catch(err=>{
        console.log(err);
    });
    

