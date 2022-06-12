
const fs=require('fs');
//path helper to construct good path 
const path=require('path'); //xem trong Model product.js how path was constructed 

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json' //lúc này trong thư mục data vẫn chưa có file cart.json tồn tại để store an object that represents our cart 
  );

module.exports=class Cart{
    //how to manage this cart?
    //obviously we want to have a cart that holds all the products that we added
    //we also want to group products by id
    //increase their quantity in case we add a product more than once.

    ////How to add and remove product here?
    static addProduct(id,productPrice){
        // Goal is fetch the previous card from our file
            /// tiếp tục dùng readFile , kết quả trả về là err hay fileContent (cả 2 sẽ ở dạng đối tượng rỗng hay đối tượng không rỗng) sẽ được xử lý trong callback 
            fs.readFile(p,(err,fileContent)=>{
                //nếu kết quả readFile là err, we know that the file does not exist yet and therefore we got no cart yet.
                //the err value and, if it is null (or really any falsey value), then there is no error and the asynchronous result is in the second parameter (if there is a result value).
                     /// khi err là NUll thì if(err==true) là if(false) sẽ không chạy
                //err is not falsey, then it represents an error value, cart will have to be created 
                let cart={products:[],totalPrice:0}; //đối tượng rỗng
                //totalPrice will always rise by the price of the product we added.

                //If we don't have an error 
                if(!err){
                    //if(err == NULL) thì we know we got the existing cart
                    //chuyển nội dung đọc được thành công thành JS object 
                    cart=JSON.parse(fileContent); //đối tượng không rỗng               
                }
                //bây giờ dù trường hợp có err hay không, we know we have a cart (rỗng hay không rỗng)
                //let's analyze the cart and see if the product we're trying to add already exists.
                //loop the array để matching id đang chờ và id existing
                const existingProductIndex=cart.products.find(prod=>prod.id===id);
                const existingProduct=cart.products[existingProductIndex];
                //nếu có 1 ID trùng thì sẽ trả về product đó, nghĩa là existingProduct != NULL
                
                //const sẽ không = khác
                let updatedProduct; //là thực thể mới (thêm thuộc tính quantity so với thực thể đã định nghĩa trong Model)
                if(existingProduct){//if(existingProduct != NULL)
                    //simply want to increase that quantity.
                    //assume that each product object that gets stored in there is not just a product object having the data defined in our product model but also that it has an extra "quantity" field.
                    //if we have an existing product, then I want to create a new product and for this I'll create a new variable, updated product
                    updatedProduct={...existingProduct};//nếu existingProduct có thuộc tính qty thì updatedProduct cũng sẽ có luôn
                    //next gen của Javascript có object spread operator thể hiện sự kế thừa và bổ sung 
                    //Tức là, I'll take all the properties of the existing product and add them to a new javascript object { } and then assign that JS object into updated product
                    updatedProduct.qty=updatedProduct.qty+1;
                    //Việc tìm index của existingProduct now allows me to use that index to replace the item in our cart products here.
                    cart.products=[...cart.products]; //tại sao tạo bản copy the old array
                    cart.products[existingProductIndex]=updatedProduct; //thế vị trí ban đầu với qty tăng 1
                }else{
                    //create product đầu tiên với thuộc tính qty
                    updatedProduct={id:id,qty:1};
                    // of course the cart should now also contain the updated product, that's also important.
                    cart.products=[...cart.products,updatedProduct];
                    //now was assigned an array with all the old cart products
                }
                cart.totalPrice=cart.totalPrice+productPrice;
                //we can save it back and for this, we can use the file system write file and write it to that path
                //we add json bằng cách dùng JSON.stringify(object)
                fs.writeFile(p,JSON.stringify(cart),(err)=>{
                    console.log(err); //trong trang /products nhấn Add to cart, nếu không có lỗi thì log ra NULL
                    //we're logging the error here and if we see null that means there was no error
                    //Bây giờ cart.json xuất hiện trong thư mục data
                })
                 
            })
        // Analyze the cart => Find existing product and see if we already have that product
        // Add new product / increase quantity
        
    }

    

}