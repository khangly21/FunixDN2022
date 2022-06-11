const fs = require('fs');
const path = require('path');
//Model là nơi xử lý lưu trữ dữ liệu, với các hàm điển hình writeFile() và readFile()

//Đường dẫn tới dữ liệu json là products.json
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

//https://stackoverflow.com/questions/31738712/nodejs-express-read-file-and-return-response-asynchronously
//Hàm này rất quan trọng, được tái sử dụng rất nhiều lần
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    //readFile có tính Sync nên phải đọc hoàn tất nó thì mới gọi hàm cb để xử lý kết quả thu được
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent)); //kết quả readFile hoặc err hoặc fileContent. Để có thể tiếp tục xử lý thì cả 2 trường hợp đều rẽ nhánh qua MẢNG
      //Tới đây thấy hàm cb chính là hàm xử lý kết quả mảng thu được từ readFile
      //nội dung của cb là gì thì không cần biết (có tính biến hóa nên dynamic), chỉ biết nó nhận tham số là mảng
    }

    //thông thường sẽ là :
     /// if(err) throw err;
     /// var resultArray = //do operation on data that generates say resultArray;
     /// res.send(resultArray); //đây là hàm Sync, do nằm trong callback của readFile nên chỉ thực hiện sau khi hoàn thành readFile() theo phong cách Async
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }


  //https://freetuts.net/callback-trong-javascript-759.html
  save() {
    this.id = Math.random().toString();
    //trong javascript thì truyền tham số và mới đầu không thể biết tham số có kiểu dữ liệu gì cho tới khi nó có giá trị
    getProductsFromFile(mang_san_pham => {
      console.log(typeof mang_san_pham) //object
      console.log(Array.isArray(mang_san_pham));//true

      //biến thể của cb xử lý kết quả đọc file 
      mang_san_pham.push(this);
      fs.writeFile(p, JSON.stringify(mang_san_pham), err => {
        console.log(err); 
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb); // chưa rõ biến thể cb này có chức năng gì
  }

  //I wanna load a specific-ID product
  static findById(id, XuLySPcoId) {
    //cb là a callback which will be executed once we're done finding the product
    //nếu có database thì có thể query 1 product với id đã biết 
    //sau khi yêu cầu product save() chính mình thì ta có product.id được tạo ra
    getProductsFromFile(products => {
      //biến thể của cb xử lý mảng products đọc được
      // use normal javascript to filter out the product we interested in.
      const product = products.find(p => p.id === id); //Yay, found. This is a synchronous function, doesn't execute any async code,
      // if this is true, then the product which I'm currently looking at will be returned and stored in this variable product
      //now run the callback
      XuLySPcoId(product);
    });
  }
};
