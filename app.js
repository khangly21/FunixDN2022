//Lab 1.5: Chuyển hướng request 2
//Khi có POST method được gửi tới http://localhost:3000/message thì tạo ra file message.txt với nội dung "DUMMY", sau đó chuyển hướng về http://localhost:3000 với response có statusCode là 302

const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;
    if(url==='/'){
        res.write('<html>')
        res.write('<head><title>Lab1.5</title></head>')
        res.write('<body><form method="POST" action="/message"><button>Send to /message</button></form></body>')
        res.write('</html>')
        return res.end();
    }else if(url==='/message' && method==='POST'){
        fs.writeFileSync('message.txt','DUMMY') //lưu dữ liệu vô file
        res.writeHead(302,{'Location':'/'})
        return res.end();
    }
})
server.listen(3006);
