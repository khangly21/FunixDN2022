    const express=require('express'); 
    const app=express(); //in other words, the express package seems to export a function, do đó we execute express as a function
    
    app.use('/add-product',(req,res,next) => {
        console.log('In the 2nd middleware!');
        res.send('<h1>Add Product</h1>'); ////if you are sending a response, this is a good indication that you never want to call next  because
        //you don't want to execute any other response related code just as before with vanilla nodejs,
    });

    
    app.use('/',(req,res,next) => { //(1)
        console.log('In the 2nd middleware!');
        res.send('<h1>Hello from Express</h1>');
    }); 
    //nếu app.use('/add_product) thì http://localhost:3023/ dẫn tới CANNOT GET / 
    //còn app.use('/' và http://localhost:3023/add_product thì ok, vẫn ra Hello from Express!
    //this middleware nằm trong (1) gets executed for both slash and add_product because this does not mean that the full path
    //nghĩa là '/' hoặc starts with '/' of course every route starts with just a slash
    //với (1), thậm chí http://localhost:3023/add_product cũng matches
    

    //Do middleware functions được xét từ top tới bottom, nên nếu / trước /add-product thì:
        /// http://localhost:3023/add-product sẽ ra Hello from Express vì matches / và không xuống middleware tiếp theo nữa, dùng next() cũng không đổi kết quả

    //if we don't call next, it's not going to the next middleware.


    app.listen(3023); //tạo 1 listening server

