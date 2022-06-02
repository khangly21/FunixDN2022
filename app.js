// modify ChuanBiLab7_B ở hàm ASYNC  fs.writeFile 
// fs.writeFileSync('message.txt',message); sẽ làm app phải hoàn thành writeFile trước khi tiếp tục 
    /// tuy nhiên trong thời gian writeFileSync() thì gặp rất nhiều incoming requests tới nên app buộc phải block chúng
    /// do đó cần dùng ASYN với writeFile()
    const http=require('http');
    const fs=require('fs');
    
    //Node: Hàm callback trong createServer() có thể tách ra lưu vào biến gọi là const requestHandler=(req,res)=>{}
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
    })
    server.listen(3017)