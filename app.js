//Lab 1.3: Gửi Response
//Hiển thị một trang HTML có một thẻ H1 với nội dung "Hello from my Node.js server!" khi truy cập vào http://localhost:3000 

const http=require('http');
const server=http.createServer((req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>HTML inside response object from NodeJS </title></head>');
    res.write('<body><h1>Hello from my Node.js server!</h1></body>');
    res.write('</html>');
})
server.listen(3002);