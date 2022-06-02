const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;
    //Xử lý điều hướng bằng cách register Event Listeners để xử lý bất đồng bộ
    
    //Endpoint homepage ko cần Event Listener, chỉ cần trả về đối tượng res có Chuoi_HTML?
    if(url==='/'){
        res.write('<html>');
        res.write('<head><title>Lab1.8</title></head>');
        res.write('<body><form action="/message" method="POST"><input name="message" type="text"/><button>Send</button></form></body>');
        res.write('</html>');
        return res.end(); //thoát khỏi hàm nặc danh
    }

    //tới enpoint cần Event Listners registered
    if(url==='/message' && method==='POST'){
        //if conditions  are met, register 2 Event Listeners sau, nhưng sẽ thực thi sau vào thời điểm nào đó trong tương lai:
        const body=[]; //const nghĩa là không thể gán lần 2
        //event listener
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk)
        });
        return req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const message=parsedBody.split('=')[1];
            fs.writeFile('message.txt',message,err=>{
                //Không có lỗi thì err là null
                //call back này được thực hiện bởi Event Loop khi FileWriting Operation kết thúc. h
                //File Operation is not handled by Event Loop
                res.statusCode=302;
                res.setHeader('Location','/'); 
                return res.end();
        })
        
    })
}
})

server.listen(3016);

//làm sao sử dụng package nodemon??
  /// trong package.json, change from "start":"nodemon app.js" thành "start":"nodemon app.js"
