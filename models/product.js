const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {//SP gọi save() đã có id , nghĩa là SP cần edit luôn có trong products.json (hover lên chữ Edit là biết id)
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {//SP gọi save() chưa có id, xảy ra khi http://localhost:3000/admin/add-product để thêm SP mới
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(){
      //I first of all need to find out which product to remove or update my array of products 
      //copy code của hàm findById function
      getProductsFromFile(products => {
        //tìm index của product trong mảng
        //const productIndex = products.findIndex(prod => prod.id === id);
        // I can update my products array such that this element is removed
        
        //Filter also takes an anonymous function and will return me ALL elements as part of a new array that do match the criteria
        const updatedProducts=products.filter(prod => prod.id !== id); //I  choose only the IDs is not equal to the ID I'm looking for
        //so the item is not kept in the new array
        //save my updated products which are all products except for the one I want to delete back to the file products.json
        //tham số thứ 3 sẽ throw any error object
        fs.writeFile(p,JSON.stringify(updatedProducts),err=>{
          //if it does not throw any error, nghĩa là error == NULL 
          if(!err){
              //everything went fine then I also want to remove that product from the cart of course because I can't have it in a cart if the product doesn't exist anymore in products.json  
              //next step in LAB4.18, we'll also work on the cart and make sure we can delete items from there
          }
        });
      });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
