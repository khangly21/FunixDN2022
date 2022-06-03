
    const http=require('http');
    const express=require('express'); //third party package
    //create an express application and store it in a constant named app
    //by running expess as a function
    const app=express(); //in other words, the express package seems to export a function, do đó we execute express as a function
    //this will initialize a new object
    //expressjs, the framework will store and manage a lot of things for us behind the scenes,
    //so a lot of logic is in this const app here.

    //Now the app here actually also happens to be a valid request handler
    const server=http.createServer(app); 
    server.listen(3021)

    //handling incoming requests  that is a key characteristic of expressjs for next lectures