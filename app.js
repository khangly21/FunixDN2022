const http=require('http');

const server=http.createServer((req,res)=>{
    //log ra console toàn bộ thuộc tính của req object tới
    console.log(req);
    process.exit(); //we actively interrupt intervention
    //typically you don't call that in your code because you don't want to quit your server, if it quits
    //people will not be able to reach your webpage anymore but this is important for understanding how this
    //works.
})

server.listen(3000);