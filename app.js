
    const http=require('http');
    const express=require('express'); 
    const app=express(); //in other words, the express package seems to export a function, do đó we execute express as a function
    
    app.use((req,res,next) => {
        console.log('In the 1st middleware!');
        next();//Allows the request to continue to the next middleware in line
    }); 
    app.use((req,res,next) => {
        console.log('In the 2nd middleware!');
        res.send('<h1>Hello from Express!</h1>');
    });
    
    const server=http.createServer(app); 
    server.listen(3022);

