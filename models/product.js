const fs = require('fs');
const path = require('path');

//import cart model 
const Cart=require('./cart');

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

  static deleteById(id){
      //I first of all need to find out which product to remove or update my array of products 
      //copy code của hàm findById function
      getProductsFromFile(products => {
        //find Product có id tham số
        const product=products.find(prod=>prod.id===id);

        //tìm index của product trong mảng
        //const productIndex = products.findIndex(prod => prod.id === id);
        // I can update my products array such that this element is removed
        
        //Filter also takes an anonymous function and will return me ALL elements as part of a new array that do match the criteria

        //câu hỏi là updatedProducts có phải mảng bản sao không
           ///https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
           /// filter sẽ tạo new array thỏa ĐK và không làm thay đổi mảng ban đầu nên nó đáp ứng quy tắc không thay đổi dữ liệu trên đối tượng ban đầu khi update,If no elements pass the test, an empty array will be returned. 
           /// console.log(mang_cu)
           /// console.log(mang_moi)
           //sau đó writeFile để ghi mang_moi đè lên mang_cu
        const updatedProducts=products.filter(prod => prod.id !== id); //I  choose only the IDs is not equal to the ID I'm looking for
        //so the item is not kept in the new array
        //save my updatedProducts which are all products except for the one I want to delete back to the file products.json
        //tham số thứ 3 sẽ throw any error object
        console.log("updatedProducts:",updatedProducts);
        fs.writeFile(p,JSON.stringify(updatedProducts),err=>{
          //Sau khi tới products.json để ghi đè writeFile mảng mới lên mảng cũ, thì gọi hàm Cart.deleteProduct() để tới cart.json để ghi đè writeFile updatedCart lên Cart cũ
          //if it does not throw any error, nghĩa là error == NULL 
          if(!err){
              //everything went fine then I also want to remove that product from the cart of course because I can't have it in a cart if the product doesn't exist anymore in products.json  
              //next step in LAB4.18, we'll also work on the cart and make sure we can delete items from there
              // let go to model>>cart.js 
              // call cart delete product and pass the ID and I also need the price

              Cart.deleteProduct(id,product.price);

          }
        });
      });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    //Duy Kha handsome ngưng hơi hờ hẫn
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);//returns the value of the FIRST element that passes a test.
      if(!product){
          console.log("No product found for id ");
          return;
      }else{
          cb(product);
      }
      
    });
  }
};
