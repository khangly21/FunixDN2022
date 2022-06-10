const fs = require('fs');
const path = require('path');

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() { //thực ra là ghi lưu dữ liệu vào file .json
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );
    //thông thường khi muốn writeFile thì đầu vào là 1 object { }, nhưng bây giờ có thể đọc đầu vào từ .json file
    fs.readFile(p, (err, fileContent) => {
         let products = [];
         if (!err) {
           products = JSON.parse(fileContent);
         }
         products.push(this); //VD sau khi new 1 product thì yêu cầu nó tự lưu bằng product.save(); this chính là product này
         
         //từ JS object products { } hay [] phải chuyển thành jsonData JSON.stringify, rồi mới writeFile
         //Nhắc lại là jsonData là sự kết hợp giữa mảng và object
         fs.writeFile(p, JSON.stringify(products), err => {
           console.log(err);
         });
    });
  }

  //Bài giảng không có đoạn này
  cb=(array)=>{ //Tại sao 0 references?
    res.render('shop', {
      prods: array,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: array.length > 0,
      activeShop: true,
      productCSS: true
    });
  }

  static fetchAll(cb) {  //hàm cb được định nghĩa riêng trước khi cho vào làm tham số
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );
    //Nếu ghi fs.readFile('../data/products.json' sẽ không chạy được
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]); //nhận tham số là mảng rỗng
        
      }
      console.log(JSON.parse(fileContent));
      cb(JSON.parse(fileContent));  //VD hàm cb nhận tham số là products khác mảng rỗng
    });
  }
};
