const express=require('express');
const router=express.Router();


//không phải router mà get mới góp phần exact matching, do đó không cần thứ tự của '/' phải ở sau các path khác như '/pro' vì / bao quát /pro sẽ khiến /pro không bao giờ được hoạt động
router.get('/',(req,res,next) => { 
    res.send('<h1>Hello from Express</h1>');
}); 

module.exports =router;