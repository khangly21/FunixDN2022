// modify ChuanBiLab7_B ở hàm ASYNC  fs.writeFile 
// fs.writeFileSync('message.txt',message); sẽ làm app phải hoàn thành writeFile trước khi tiếp tục 
    /// tuy nhiên trong thời gian writeFileSync() thì gặp rất nhiều incoming requests tới nên app buộc phải block chúng
    /// do đó cần dùng ASYN với writeFile()
    const http=require('http');
    const routes=require('./routes');//we assign whatever is exported from that file in that routes constant
    console.log(routes.someText);
    //Node: Hàm callback trong createServer() có thể tách ra lưu vào biến gọi là const requestHandler=(req,res)=>{}
    const server=http.createServer(routes.handler); //Don't execute it, so no parentheses routes(), 
    //just pass the name telling node hey please execute the function that's stored inroutes for incoming requests
    server.listen(3020)