    const path=require('path');
    const express=require('express'); 
    const app=express(); 
    const bodyParser=require('body-parser');
    //import middleware
    const adminRoutes=require('./routes/admin');//không cần .js vì nó tự động được thêm vào
    const shopRoutes=require('./routes/shop');

    //using bodyParser object 
    //here and now what this does is it registers a middleware nhờ gọi hàm urlencoded() , sẽ có ảnh hưởng req.body mặc dù we cannot see it
    app.use(bodyParser.urlencoded({extended:false}));
    //Tác dụng của hàm urlencoded: this will not parse all kinds of possible bodies, files, json and so on but this will parse bodies like the one we're getting here, sent through a form
    //Vậy nó hỗ trợ form gửi req object
    
    //serve / grand access to static files
    app.use(express.static(path.join(__dirname,'public')));
    
    app.use('/admin',adminRoutes); //  '/admin' as a filter path! only routes starting with /admin will go into the admin routes file
    app.use(shopRoutes);

    //incoming request sẽ goes thru top to bottom các middleware trên
    //the order of middlewares matters
    //giả sử app.use(adminRoutes()); nằm sau "/" thì nó không bao giờ được reach tới, vì "/" bao hàm cả "/add-product" và "/product" 

    app.use((req,res,next)=>{
        res.status(404).sendFile(path.join(__dirname,'views','404.html'));
        //ngoài ra có thể res.setHeader().send()
    })

    app.listen(3025); //tạo 1 listening server

