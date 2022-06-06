const express=require('express'); //phải có để có router
const router=express.Router();
const path=require('path');

//không phải router mà get mới góp phần exact matching, do đó không cần thứ tự của '/' phải ở sau các path khác như '/pro' vì / bao quát /pro sẽ khiến /pro không bao giờ được hoạt động
router.get('/',(req,res,next) => { 
    res.sendFile(path.join(__dirname,'..','views','shop.html'));
}); 

module.exports =router;