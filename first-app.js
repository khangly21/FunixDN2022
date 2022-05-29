console.log("Hello from NodeJS,write a content to a nonexistent file") 

//import syntax 
const fs=require('fs')  // save filesystem object into a simple const variable

// sử dụng filesystem functionalities của object trên
fs.writeFileSync('write.txt','Hello writing world') //write file to hard drive
//lưu ý argument truyền vào phải là file path including the filename 
//second argument là content of file in argument 1
// save and chạy "node first-app.js" sẽ thấy write.txt xuất hiện trong thư mục Mở đầu hiện tại


