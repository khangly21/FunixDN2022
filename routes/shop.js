const express=require('express'); //phải có để có router
const router=express.Router();
const path=require('path');
const adminData=require('./admin');

//không phải router mà get mới góp phần exact matching, do đó không cần thứ tự của '/' phải ở sau các path khác như '/pro' vì / bao quát /pro sẽ khiến /pro không bao giờ được hoạt động
router.get('/',(req,res,next) => { 
    res.render('shop'); //res.render được cung cấp bởi expressjs và được sử dụng mặc định bởi templating engine
    //ở đây không cần .pug vì đã khai báo templating engine là pug
    // it will look for .pug files
}); 

module.exports =router;