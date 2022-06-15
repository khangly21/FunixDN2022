const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(
      //can of course get rid of that "fieldData", you don't need to extract that because we're not using it,
       ([rows,fieldData])=>{
           res.render('shop/product-list', {
               prods: rows,
               pageTitle: 'All Products',
               path: '/products'
           });
       }
    )
    .catch(err=>{console.log(err)}); 
};


//fetch 1 product khi USER nhấn nút Details trong trang hiển thị tất cả sản phẩm /products. Cách khác là viết trực tiếp SP muốn tìm lên thanh tìm kiếm http://localhost:3000/products/2
//click a href Details trong menu Product để yêu cầu trang router.get('/products/:productId', shopController.getProduct);
   //// http://localhost:3000/products/3
//Không phải post vì chỉ đơn giản nhấn link a href , <a href="/products/<%= product.id %>" class="btn">Details</a>
exports.getProduct = (req, res, next) => {
   const prodId = req.params.productId;

  //then() chỉ lấy mảng thứ nhất của kết quả rồi gán vào biến product, đó là các dòng thu được
  //Make sure to wrap that special syntax with the square brackets , như vầy   ([product])=>
  Product.findById(prodId) 
  .then(([product])=>{
    //[product] chính là mảng chứa đối tượng id cần tìm
    console.log(`product được chọn bằng id ${prodId}: \n`,product); //kết quả là 1 mảng chứa đối tượng cần tìm
    //trước khi truyền cho View, kiểm tra đảm bảo là 1 đối tượng , không truyền mảng 
       ///https://stackoverflow.com/questions/8875878/javascript-instanceof-if-statement
    if(!(product[0] instanceof Array)){  //ghi if(product !instanceof Array) là sai
      console.log("Passed! product is plan JS object!! You can transfer it to view");
      res.render('shop/product-detail', {
        product: product[0], //chỉ cần lấy đối tượng product trong mảng product
        pageTitle: product[0].title, //truy cập title của đối tượng product
        path: '/products'
      });
    }else {
      //The object is not an instance of Array
      //Perform actions!
      console.log("Chú ý if(!(product instanceof Array)): bạn vừa truyền mảng chứ không phải đối tượng");
      res.redirect('/products'); //không cho GET tới trang /products/:prodId
    }
    
  })
  .catch(err=>{console.log(err)});
  //Kết quả hiển thị của view shop/product-detail chỉ là "form" Add to cart của includes/add-to-cart.js thôi, còn phần main (hiển thị thông tin SP như title, price, description) thì không hiển thị
  //Như vậy product đã failed , không được truyền tới 'shop/product-detail', nên console.log(product) để xem tại sao failed
  //thấy rằng product là 1 mảng chứa đối tượng cần tìm,như vậy thành phần thứ nhất của mảng tham số mà then() nhận là 1 mảng được gán vào product
  /*
    //Modern destructuring assignment
    [a, b, ...rest] = [[100,200], 20, 30, 40, 50];
    console.log(a);  // expected output: Array [100,200]
    console.log(b);  //expected output: 20
    console.log(rest); // expected output: Array [30,40,50]
  */
  //Cần cơ chế báo hiện nếu truyền mảng tới view là sẽ có cảnh báo
    ///the view simply expects one single object, not an array with one object.

}
  
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
       .then(
           // use some next gen syntax with a feature called destructuring where I can already pull out information of the value I'm receiving as an argument 
           // my anonymous function which will be executed once we get data which is array chứa 2 mảng là table info array và table metadata array  
           // rows should be my mảng products, chính là mảng chứa 2 đối tượng dòng
          ([rows,fieldData])=>{
              res.render('shop/index', {
                  prods: rows,
                  pageTitle: 'Shop',
                  path: '/'
              });
          }

       )
       .catch(err=>{console.log(err)});  //nhớ check console xem có err gì không
    //don't have to add both but you typically also want to have some error handling mechanism
    
};

exports.getCart = (req, res, next) => {
  // now I need my cart and I need the products in cart
  Cart.getCart(cart=>{
      //sau khi đọc ra cart thì hàm callback nhận cart làm tham số để xử lý tiếp
      //added callback function I just added in the cart model where I will eventually receive the cart and I will render my view inside of this function.
      Product.fetchAll(products=>{
          //products KHÔNG PHẢI là kết quả của xử lý cb(cart), mà là products trong products.json 
          const cartProducts=[];
          //I just need to filter out the products which are actually in the cart. So I will go through all my products
          for(const product of products){ 
               //hay for(product of products)
               //Chú ý: không lẫn lộn dùng for(let product in products) hay for(product in products) sẽ không console log ra product.id
               //https://www.w3docs.com/snippets/javascript/how-to-loop-through-an-array-in-javascript.html
               //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
               // I will use product ID to check if this given product is also stored in a cart
               //if the product I'm looking at in the cart, if the ID of that product equals my product ID here 
               //of course this is some code that can be improved if you store large quantities of data but we won't store large quantities of data in our file

               //check product có là part of cart không thì so ID
               //check existence with if 
               console.log("product trong products.json được duyệt tới: ",product.id);
               
               const cartProductData=cart.products.find(prod=>prod.id === product.id);
               console.log("cartProductData",cartProductData);//undefined mấy lần ? là bằng số SP có trong products.json
               if(cartProductData){
                   //find() trả về first element thỏa, không tìm ra thì undefined 
                   //nếu tất cả lần lặp là undefined thì không có push vào, dẫn tới mảng cartProducts rỗng, thì render cart.ejs là "No Products in Cart!"
                   cartProducts.push({productData:product,qty:cartProductData.qty});
                   //Now important, just adding the product like cartProducts.push(product) does not suffice
                      /// vì cấu trúc 1 product trong cart phải có id và qty, trong khi products.json lưu đối tượng có id mà không có qty 
                      /// giá trị của productData là complete product object
                   //now I wanna return cartProducts array tới view 'shop/cart'
               }
          }
          //Sau khi loop,  I'll have an array of cart products that contains all the products which are indeed part of the cart.
          //render 
          res.render('shop/cart', {
              path: '/cart',
              pageTitle: 'Your Cart',
              //gửi mảng tới view 'shop/cart' cho nó khai thác thông tin products trong cart
              //nếu không có product nào thì cartProducts là 1 empty array , and I can check that with EJS template
              products:cartProducts
          }); 
      })
      
  });
  //a lot of callbacks here but it's still readable, later we'll also find another way of working with a lot of depending async actions
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  //since we access a file in controllers như postCart and postCartDeleteProduct, theoretically we should use a callback here too.
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct=(req,res,next)=>{
    //ere we'll have to remove that product from the carts but only from the cart.json, not the products.json itself.
    //first of all extract the product ID from the request body, taken from input hidden
    const prodId=req.body.productId;
    //Bước 2 : yêu cầu Card phải deleteProduct, nên phải cần productPrice, dễ dàng có được bằng cách gọi Product.findById sau đó dùng hàm callback(product_tim_thay)
    Product.findById(prodId,product=>{
        Cart.deleteProduct(prodId,product.price);
        res.redirect('/cart'); //nếu /card  sẽ nhận "Page Not Found!"
    })

    //Cách khác cho bước 2: of course we could have also used a hidden input to pass the price to the backend but I think this is the cleaner approach
        /// <input type="hidden" name="productId" value="<%= p.productData.price %>">
    //My clean approach is: we only pass the ID through the request and then we do all the data retrieval on the backend in our node express code.
    //Cũng như triết lý của HandlebarsJS: không tính toán trên hbs template, các tính toán chỉ thực hiện với Express code
    

};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
}
