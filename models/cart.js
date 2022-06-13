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
    //totalPrice cũng cần được updated luôn
    //first of all I need to get my cart, so I need to read my file 
    //copy code readFile đến đường dẫn cart.json rồi refactor 
    fs.readFile(p,(err,fileContent)=>{
        if(err){
           //nghĩa là tui không tìm thấy cart
           //không có gì phải delete, so I just ignore 
           return;
        }
        //no error here, continue
        //I will update the cart
        //Như 1 quy tắc, update thì tạo ra bản copy chứ không update trực tiếp lên dữ liệu 
           ///tạo bản copy là đối tượng { }, sau đó lưu địa chỉ vào biến updatedCard  
           /// take all the properties of the old cart and put them into a new object with that spread operator

        //chuyển JSON string sang JS object
        
        const updatedCart={...JSON.parse(fileContent)}; 
        //This will be fixed later, "cart" object does not exist here, we will need to (JSON.) parse that from fileContent to become JS object ! 
           /// nếu Admin Products >> Delete thì sẽ báo lỗi "cart" is not defined here, vì local hàm callback không có biến cart được parse từ fileContent

           
        //I now want to update 2 thuộc tính của cart object là  both the (plan 1) mảng products and (plan 2) the totalPrice
           ///(plan 2) total price should be reduced by the product price, however this would be incorrect because if we have the product in the cart three times =>  correct plan is it should be reduced by the product price times three.
        //I just need the product to find out what the quantity is
        console.log(id);
        //Problem là id cần xóa có trong products.json nhưng chưa chắc có trong cart.json, sẽ dẫn tới biến product sau undefined và báo lỗi cannot read property "qty", nếu product có trong cả products.json và cart.json thì sẽ không báo lỗi
        
        const product=updatedCart.products.find(prod=>prod.id===id);
        console.log(product); //nếu product muốn xóa có trong cart.json thì ok, ngược lại là undefined

        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
        if(product !== undefined){ //nghĩa là product được khai báo let product nhưng chưa được assign giá trị nào hết
             //remember, we're storing the quantity in that qty field,
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
        }
    })
  }
};
