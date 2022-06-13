const fs = require('fs');
const path = require('path');
const { createBrotliCompress } = require('zlib');

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
      }
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
    fs.readFile(p,(err,fileContent)=>{
        if(err){
           //nghĩa là tui không tìm thấy cart
           //không có gì phải delete, so I just ignore 
           return; //thoát khỏi hàm deleteProduct
        }
        //no error here, continue chạy hàm deleteProduct


        //I will update the cart
        //Như 1 quy tắc, update thì tạo ra bản copy chứ không update trực tiếp lên dữ liệu 
           ///tạo bản copy là đối tượng { }, sau đó lưu địa chỉ vào biến updatedCard  
           /// take all the properties of the old cart and put them into a new object with that spread operator

        //chuyển JSON string sang JS object, sau đó dùng object spread operator để tạo 1 bản copy, rồi assign bản copy này cho biến updatedCart
        //Từ này sẽ update trên bản copy updatedCart, chứ không update trên JSON.parse(fileContent)
           /// updatedCart sẽ được bỏ số lượng x (SP cần bỏ) và totalPrice sẽ giảm theo giá của tất cả  x SP cần bỏ
           // cụ thể, cập nhật updatedCart.products và updatedCart.totalPrice
           // sau đó ghi đè updatedCard vào file cart.json
        const updatedCart={...JSON.parse(fileContent)}; 
      
        //I now want to update 2 thuộc tính của updatedCart là  both the (plan 1) mảng products and (plan 2) the totalPrice
           ///(plan 2) total price should be reduced by the product price, however this would be incorrect because if we have the product in the cart three times =>  correct plan is it should be reduced by the product price times three.
        //I just need the product to find out what the quantity is 
        console.log(id);
        //Problem là id cần xóa có trong products.json nhưng chưa chắc có trong cart.json, sẽ dẫn tới biến product sau undefined và báo lỗi cannot read property "qty", nếu product có trong cả products.json và cart.json thì sẽ không báo lỗi
        
        const product=updatedCart.products.find(prod=>prod.id===id); //nếu tìm ra thì cart's product có 2 thuộc tính id và qty
        console.log(product); //nếu product trong products.json muốn xóa có trong cart.json thì ok, ngược lại product là undefined
        if(!product){
          return;
          //we don't have a product then I simply need to return here, I don't wanna continue những update tiếp theo vì không có product; 
          //vì nếu tiếp tục sẽ báo lỗi thuộc tính qty cannot be read
        }  
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
       
        //remember in cart's product, we're storing the quantity in that qty field,
        const productQty=product.qty;//nếu product undefined thì báo lỗi undefined qty
             //(plan 1) cập nhật mảng products trong bản sao updatedCart 
                 /// hàm filter lấy tất cả array items thỏa điều kiện prod.id!==id
        updatedCart.products=updatedCart.products.filter(prod=>prod.id!==id); 
             //(plan 2) bấy giờ đã có totalPrice lẫn số lượng SP cần xóa
        updatedCart.totalPrice=updatedCart.totalPrice-productPrice*productQty;
             //This function will begin it`s writing always at the beginning of a file, so it will overwrite previous content.
                /// Dẫn tới cart.json, updatedCart sẽ overwrite lên cart cũ , đó là lý do dùng object spread operator 
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
