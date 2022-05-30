const http=require('http');
const server=http.createServer(function(req, res){
    //nhận url từ đối tượng req chuyển tới NODEJS
    const url=req.url;
    //điều hướng
    if(url==="/"){
        //gọi 2 methods setHeaders và write
        res.setHeader('Content-Type','text/html; charset=utf-8'); 
        res.write('<html>');
        res.write('<head><title>Lab1.4 Request</title></head>');
        res.write('<body><form method="GET" action="/MyMessage"><input name="lab1-4"/><input type="submit"></form></body>'); 
        //chú ý <input type="submit"/> tương đương <button></button>
        //button tag thì cần nội dung bên trong như Send
        //còn input type="submit" thì không cần nội dung, vì mặc định là nút có giá trị Submit
        //Khi click button Submit trên browser thì 1 req được gửi tới /MyMessage 
        res.write('</html>');
        return res.end();
    }
    //Không có dòng sau là trình duyệt quay vô tận do không nhận được res từ server
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>HTML inside response object from NodeJS </title></head>');
    res.write('<body><h1>Hello from my Node.js server!</h1></body>');
    res.write('</html>');
    res.end();
})
server.listen(3004);