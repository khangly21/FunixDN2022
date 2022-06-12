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
  constructor(id,title, imageUrl, description, price) {
    //Khi create new product, cũng nên accept id
    this.id=id; //simply pass null here for a brand new product, so that we can still create products that don't have an ID yet (là ý nghĩa của NULL) then the ID will be assigned here in save()
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products=>{
      if(this.id){ //tồn tại hay product which is calling save() đang có id != NULL
        const existingProductIndex=products.findIndex(product=>product.id === this.id); //Nếu tìm ra id trùng thì update SP cũ bằng SP mới
        //simply have to replace that in that products array.
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex]=this;
        //being saved, I just have to write that information to the file
        //writeFile will always replace all the old content
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }else{
            //Nếu id=NULL tức là đang chờ cấp id, thì phải cấp id mới
             this.id = Math.random().toString();
             getProductsFromFile(products => {
               products.push(this);
               fs.writeFile(p, JSON.stringify(products), err => {
                 console.log(err);
               });
               })
      };
    })
    
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
