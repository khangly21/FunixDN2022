const express=require('express');
const router=express.Router();

//register routes for router

//router.use()  cũng có chức năng như app.use()

//because I only want to handle get requests 

router.get('/add-product',(req,res,next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

//đích đến của form post
router.post('/product',(req,res,next)=>{   
    console.log(req.body); 
    res.redirect('/'); 
});

module.exports =router; //nice thing about this router that it is actually a valid middleware function.