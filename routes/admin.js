const path=require('path');
const express=require('express');
const rootDir=require('../util/path');
const router=express.Router();


//register routes for router

//router.use()  cũng có chức năng như app.use()

//because I only want to handle get requests 
//  /admin/add-product =>GET
router.get('/add-product',(req,res,next) => {//match /admin/add-product
    //CHÚ Ý: dù trong folder admin NHƯNG Chuoi_HTML không tự hiểu là có prefix admin, nên nếu gửi tới action="/add-product" sẽ 404
    res.sendFile(path.join(rootDir,'views','add-product.html'));
});

//đích đến của form post với action points at "/product"
//the same path can be used if the methods differ
//Do giống nhau ở /admin nên

//  /admin/add-product =>POST
router.post('/add-product',(req,res,next)=>{   
    console.log(req.body); 
    res.redirect('/'); 
});

module.exports =router; //nice thing about this router that it is actually a valid middleware function.