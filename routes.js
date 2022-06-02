const fs=require('fs');

//Định nghĩa ham 
        /*
        function requestHandler(req,res){

        }
        //we'll effectively replace that nonname function in app.js
        */

        //or use ES6 function , store it in a variable 
        //essentially creating an anonymous arrow function which we store in a constant and this therefore "requestHandler" is the function name.
        const requestHandler=(req,res)=>{
            //named this way, req and res objects are now local variables
            const url=req.url;
            const method=req.method;
            if(url==='/'){
                res.write('<html>');
                res.write('<head><title>Lab1.6</title></head>');
                res.write('<body><form action="/message" method="POST"><input name="message" type="text"/><button>Send</button></form></body>');
                res.write('</html>');
                return res.end();
            }
        
            //tới enpoint cần Event Listners registered
            if(url==='/message' && method==='POST'){
                //if conditions  are met, register 2 Event Listeners sau, nhưng sẽ thực thi sau vào thời điểm nào đó trong tương lai:
                const body=[];
                req.on('data',(chunk)=>{
                    console.log(chunk);
                    body.push(chunk)
                });
                //parsing the req với req.on('end',function that will be executed at some point in the future) 
                //chứ không writeFile ngay lập tức vì phải đón nhận new comming requests . Chỉ writeFile khi request nào tới hạn
                return  req.on('end',()=>{
                    const parsedBody=Buffer.concat(body).toString();
                    const message=parsedBody.split('=')[1];
                    fs.writeFile('message.txt',message,err=>{
                        res.statusCode=302;
                        res.setHeader('Location','/'); 
                        return res.end();
                    });
                });
                
            }
    
            //my default response code
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>My First Page</title></head>');
            res.write('<body><h1>Hello from my NODEJS server</h1></body>');
            res.write('</html>');
            return res.end();
        }
        
        //module.exports=requestHandler; //I register my function to be exported globally

        //module.exports pointing at an object to combine multiple things
        module.exports={
            handler:requestHandler,
            someText:"Some hard coded text"
        };