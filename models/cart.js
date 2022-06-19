const fs = require('fs');
const path = require('path');


const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      } //như vậy khi có err thì cart mặc định, không có err thì cart = JSON.parse(fileContent);
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id,productPrice){
    //file reads async
    
    fs.readFile(p,(err,fileContent)=>{
        if(err){
           //nghĩa là tui không tìm thấy cart
           //không có gì phải delete, so I just ignore 
           return; //(thoát callback function ngay chỗ này mà không thực hiện ghi đè file bên dưới nữa)
           //https://stackoverflow.com/questions/31426607/exiting-a-callback-function
        }
        const updatedCart={...JSON.parse(fileContent)}; 
       
        const product=updatedCart.products.find(prod=>prod.id===id);
        if(!product){
          return; //thoát hàm callback, không tiếp tục cập  nhật nữa
        }
        
        const productQty=product.qty;//nếu product undefined thì báo lỗi undefined qty
            
        updatedCart.products=updatedCart.products.filter(prod=>prod.id!==id); 
        
        updatedCart.totalPrice=updatedCart.totalPrice-productPrice*productQty;
             
        fs.writeFile(p,JSON.stringify(updatedCart),err=>{
            console.log(err);
        })
  
    })
  }

  static getCart(cb){
     //tên hàm là getCart sẽ chính xác hơn là getProducts
     //access my file and simply return the product IDs.
     //cần hàm callback để được gọi xử lý ngay lập tức once I got products from readFile
     //tuy nhiên kết quả readFile ở đây JSON.parse ra đối tượng cart { } chứ không phải mảng products 
     //do đó cb sẽ xử lý đối tượng cart 
     fs.readFile(p,(err,fileContent)=>{
        const cart=JSON.parse(fileContent);
        //obviously this can fail if we have no carts yet so I will check if we have an error
        //xét xem err có tồn tại không
        if(err){
           cb(null);
        }else{
           cb(cart);
        }
        
     })
  }
};
