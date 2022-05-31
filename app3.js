const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;
    //Xử lý điều hướng bằng cách register Event Listeners để xử lý bất đồng bộ
    
    //Endpoint homepage ko cần Event Listener, chỉ cần trả về đối tượng res có Chuoi_HTML?
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
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const message=parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
        })
        
    }

    //vì tính ASYNC của Nodejs, các registered Event Listerner sẽ chạy sau các dòng sau đây
    res.statusCode=302;
    res.setHeader('Location','/');
    return res.end();
    //làm sao báo lỗi không nhận được dữ liệu ở NODEJS 
});
server.listen(3011);