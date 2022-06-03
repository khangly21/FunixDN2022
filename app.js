
    const http=require('http');
    const express=require('express'); //third party package
    //create an express application and store it in a constant named app
    //by running expess as a function
    const app=express(); //in other words, the express package seems to export a function, do đó we execute express as a function
    //this will initialize a new object
    //expressjs, the framework will store and manage a lot of things for us behind the scenes,
    //so a lot of logic is in this const app here.
    app.use((req,res,next) => {
        console.log('In the 1st middleware!');
        next();//Allows the request to continue to the next middleware in line
    }); //allows us to add new middleware function. Nếu không add Mi mà npm start thì App crashes: app.use() requires a middleware function
    //use() accepts an array of so-called request handlers and it has some other use cases too.
    //Now the app here actually also happens to be a valid request handler
    app.use((req,res,next) => {
        console.log('In the 2nd middleware!')
    });
    
    const server=http.createServer(app); 
    server.listen(3022);

    //handling incoming requests  that is a key characteristic of expressjs for next lectures