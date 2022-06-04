    const express=require('express'); 
    const app=express(); 
    const bodyParser=require('body-parser');
    
    //using bodyParser object 
    //here and now what this does is it registers a middleware nhờ gọi hàm urlencoded() , sẽ có ảnh hưởng req.body mặc dù we cannot see it
    app.use(bodyParser.urlencoded({extended:false}));
    //Tác dụng của hàm urlencoded: this will not parse all kinds of possible bodies, files, json and so on but this will parse bodies like the one we're getting here, sent through a form
    //Vậy nó hỗ trợ form gửi req object



    app.use('/add-product',(req,res,next) => {
        res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
        //this will send a html code back which holds a form
    });

    //you can of course omit an argument you are not planning to use
    //but I always add it here to make it clear that it exists.
    app.use('/product',(req,res,next)=>{
        //I wanna redirect and log incoming data to console 
        console.log(req.body); 
        //why undefined?
        //request gives us this req.body property here but by default, request doesn't try to parse the incoming request body
          ///we need to register a parser and we do that by adding another middleware.
          ///typically do that before your route handling middlewares because the parsing of the body should be done no matter where your request ends up
          //cần cài thirdparty package: npm install --save body-parser   //trước kia bị loại bỏ khỏi express nhưng giờ nó đã trở lại


        res.redirect('/'); 

    })

    
    app.use('/',(req,res,next) => { //(1)
        res.send('<h1>Hello from Express</h1>');
    }); 
    
    app.listen(3024); //tạo 1 listening server

