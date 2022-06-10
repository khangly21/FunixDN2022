const fs = require('fs');
const path = require('path');

//Global helper constants 
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);


//Helper function
//now we get a slimmer version because we're reusing code
//the need to inform the caller of this function about when it's done
const getProductsFromFile= (cb)=>{ //cb will be executed once file has been done reading
  
  //Nếu ghi fs.readFile('../data/products.json' sẽ không chạy được
  fs.readFile(p, (err, fileContent) => { //this process takes some time
    if (err) {
      cb([]); //nhận tham số là mảng rỗng
      
    }else{
       console.log(JSON.parse(fileContent));
       cb(JSON.parse(fileContent));  //VD hàm cb nhận tham số là products khác mảng rỗng
    }
  });
}

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() { //thực ra là ghi lưu dữ liệu vào file .json
    getProductsFromFile(products=>{
      products.push(this); // always use arrow functions so that this never loses its context and always refers to the class and therefore to the object based
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
   
  }

  static fetchAll(cb) {  //get Products from file
    getProductsFromFile(cb);
  }
};
