const path=require('path');
const express=require('express');
const rootDir=require('../util/path');
const router=express.Router();

const products=[];


//register routes for router
//router.use()  cũng có chức năng như app.use()
//

console.log('rootDir:   '+rootDir)
//  /admin/add-product =>GET because I only want to handle get requests 
router.get('/add-product',(req,res,next) => {
    res.render('add-product',{
        pageTitle:'Add Product',
        path:'/admin/add-product',
        formCSS:true,
        productCSS:true,
        activeAddProduct:true}); 
    //doesn't have to match the path this route has, just a pattern I like.
});

//  /admin/add-product =>POST
router.post('/add-product',(req,res,next)=>{   
    console.log(req.body); 
    products.push({title:req.body.title});
    res.redirect('/'); 
});

//exports
exports.routes =router; 
exports.products=products; //đưa qua shop.js để output các products
//we can export something, some object or array, a reference type