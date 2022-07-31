//in here, I want to manage my authentication related routes.
const express= require('express');

const authController=require('../controllers/auth')

const router=express.Router();

// router's GET request for /login then which will load the login page , and a anonymous arrow function to handling that incoming request
// router.get('/login',(req,res,next)=>{
//     //render view
//     //I want to render a page in the let's say auth folder
//     res.render('')
// });

//I will not specify callback like above
//I will  point at my controller with the get login function.

router.get('/login',authController.getLogin);

//router.get('/logout',authController.getLogout);  SAI do /logout có sau khi postForm, do đó post button xong thấy pageTitle "Page Not Found"

router.get('/signup',authController.getSignup);

router.post('/login',authController.postLogin); //Sau khi click Login button, ta được tới / page, so this could mean we are authenticated.
//Tiếp theo cần (Lưu trữ thông tin của authenticated user)

router.post('/signup',authController.postSignup);

router.post('/logout',authController.postLogout);

module.exports=router  //router này chứa mảng GET chứa các thông tin liên quan GET req
// Then in order to reach that route, we of course need to register it in the app.js file  