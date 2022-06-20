const Product = require('../models/product'); // a sequelize model (instance), now is imported here so that Controller can order it to use methods in sequelize library
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll() //assume we get a Promise as an array/list of products go to then()
         .then(products=>{
               res.render('shop/product-list', {
               prods: products,
               pageTitle: 'All Products',
               path: '/products' //mục đích hightlight menu
            });
         }) 
         .catch(err=>console.log(err));
};


//fetch 1 product khi USER nhấn nút Details trong trang hiển thị tất cả sản phẩm /products. Cách khác là viết trực tiếp SP muốn tìm lên thanh tìm kiếm http://localhost:3000/products/2
//click a href Details trong menu Product để yêu cầu trang router.get('/products/:productId', shopController.getProduct);
   //// http://localhost:3000/products/3
//Không phải post vì chỉ đơn giản nhấn link a href , <a href="/products/<%= product.id %>" class="btn">Details</a>
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId);// 5 (ID không thuộc SP nào hết, error caught!!)
    //trong list of methods của Product không chỉ thấy findOne() 
    //Err: findById() is not a function. còn findOne(prodId) thì báo lỗi Err: The argument passed to findOne must be an options object, use findByPk if you wish to pass a single primary key value
    //đã thành công cách Product.findByPk(prodId)
    //Bây giờ cách 2 là findAll( { } ) with WHERE condition, 
    // any object you can pass to as parameter.you got a rich query language or a rich amount of options you can use to configure this
    Product.findAll({where:{id:prodId}})
    //IMPORTANT: findAll trả về Promise 1 array by default 
      /// Why? because even though we know that only one product will have this ID, findAll() per definition always gives you multiple items even if it's an array with only one element.
           .then(products=>{
               res.render('shop/product-detail', {
                 product: products[0], //chỉ cần lấy đối tượng product duy nhất trong mảng products
                 pageTitle: products[0].title, //truy cập title của đối tượng product
                 path: '/products'
               });
           })
           .catch(err=>{console.log(err);res.redirect('/products')}); //nếu gửi ID lên URL  mà ID không thuộc SP nào thì redirect });
}

exports.getIndex = (req, res, next) => {
  //trước kia class tự định nghĩa thì gọi hàm static fetchAll() bằng cách controller yêu cầu Product.fetchAll()
  // bây giờ là class mạnh hơn là Sequelize.Model extends class Model thì không chứa fetchAll() 
  Product.findAll() //assume we get a Promise as an array/list of products go to then()
      //Mentor NgoTuanAnh:  Nếu thành công, Promise sẽ được resolve(productsArr) thì then(products), ngược lại reject() thì nó sẽ throw 1 lỗi ra và b sẽ phải catch(e) nó. Từ đây b có thể xử lý bàng cách gán mảng rỗng hay gì đó thì tùy vào tình huống nè.
         .then(products=>{
               res.render('shop/index', {
               prods: products,
               pageTitle: 'Shop',
               path: '/'
            });
         }) 
         .catch(err=>console.log(err));
  //findAll() which search for multiple instances (can use WHERE condition to filter objects) ,as you can imagine also gives us back a promise where we can use the result.
  //Như vậy findAll() can be configured with some options,example WHERE clause findAll({where:{ } }) hover sẽ thấy
};

exports.getCart = (req, res, next) => {
  //still the user stored in our request
  //đây là user gắn liền với bất cứ new req nào tới Express, nên có thể gọi là "existing user"

  // I want to use the cart associated with my EXISTING user (tức là bảng cart có userId) to get all the products in it and render
     /// cho nên thử xem Sequelize give us which magic
  console.log("req.user.cart",req.user.cart); //undefined, thậm chí có cart trong carts => type này cho thấy không tồn tại biến user.cart trong bộ nhớ. so we can't access the cart like this.
  req.user
     .getCart() //SELECT * FROM carts AS cart WHERE cart.userId=1 LIMIT 1;
     .then(cart=>{ //tìm thấy hoặc null
      //reload trang sau http://localhost:3001/cart
       console.log("Nội dung của cart là : \n" , cart); //null (do không chứa địa chỉ trỏ tới đối tượng nào hết) but not undefined, vì bảng carts đang rỗng
       //the reason why we don't find anything here for either of the two approaches is that we got no carts
       //Khi có cart từ database rồi, we can use it to fetch the products that are inside of it by returning carts getSANPHAMs() 
       return cart.getSANPHAMs()
                  .then(
                      //should have the products that are in this cart
                      products=>{
                         //of course means that we can now render these products in view.
                          res.render('shop/cart', { //TRANG của nút PRODUCTS cũng có nút "Add to cart", vậy có render tới đó không
                              path: '/cart',
                              pageTitle: 'Your Cart',
                              //gửi mảng tới view 'shop/cart' cho nó khai thác thông tin products trong cart
                              //nếu không có product nào thì cartProducts là 1 empty array , and I can check that with EJS template
                              products:products //store them in products and pass them to the view.
                          }); 
                      }
                  )
                  .catch(err=>console.log(err));
       /*
          Cart.belongsToMany(Product, {through:CartItem});  //So we can get products, this was added by sequelize as a magic method
          Product.belongsToMany(Cart,{through:CartItem});
       */
     })
     .catch(err=>console.log(cart));


  // now I need my cart and I need the products in cart
  // Cart.getCart(cart=>{
  //     //sau khi đọc ra cart thì hàm callback nhận cart làm tham số để xử lý tiếp
  //     //added callback function I just added in the cart model where I will eventually receive the cart and I will render my view inside of this function.
  //     Product.fetchAll(products=>{
  //         //products KHÔNG PHẢI là kết quả của xử lý cb(cart), mà là products trong products.json 
  //         const cartProducts=[];
  //         //I just need to filter out the products which are actually in the cart. So I will go through all my products
  //         for(const product of products){ 
  //              //hay for(product of products)
  //              //Chú ý: không lẫn lộn dùng for(let product in products) hay for(product in products) sẽ không console log ra product.id
  //              //https://www.w3docs.com/snippets/javascript/how-to-loop-through-an-array-in-javascript.html
  //              //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
  //              // I will use product ID to check if this given product is also stored in a cart
  //              //if the product I'm looking at in the cart, if the ID of that product equals my product ID here 
  //              //of course this is some code that can be improved if you store large quantities of data but we won't store large quantities of data in our file

  //              //check product có là part of cart không thì so ID
  //              //check existence with if 
  //              console.log("product trong products.json được duyệt tới: ",product.id);
               
  //              const cartProductData=cart.products.find(prod=>prod.id === product.id);
  //              console.log("cartProductData",cartProductData);//undefined mấy lần ? là bằng số SP có trong products.json
  //              if(cartProductData){
  //                  //find() trả về first element thỏa, không tìm ra thì undefined 
  //                  //nếu tất cả lần lặp là undefined thì không có push vào, dẫn tới mảng cartProducts rỗng, thì render cart.ejs là "No Products in Cart!"
  //                  cartProducts.push({productData:product,qty:cartProductData.qty});
  //                  //Now important, just adding the product like cartProducts.push(product) does not suffice
  //                     /// vì cấu trúc 1 product trong cart phải có id và qty, trong khi products.json lưu đối tượng có id mà không có qty 
  //                     /// giá trị của productData là complete product object
  //                  //now I wanna return cartProducts array tới view 'shop/cart'
  //              }
  //         }
  //         //Sau khi loop,  I'll have an array of cart products that contains all the products which are indeed part of the cart.
  //         //render 
  //         res.render('shop/cart', {
  //             path: '/cart',
  //             pageTitle: 'Your Cart',
  //             //gửi mảng tới view 'shop/cart' cho nó khai thác thông tin products trong cart
  //             //nếu không có product nào thì cartProducts là 1 empty array , and I can check that with EJS template
  //             products:cartProducts
  //         }); 
  //     })
      
  // });
  // //a lot of callbacks here but it's still readable, later we'll also find another way of working with a lot of depending async actions
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId; //trước khi bấm nút "Add to Cart" thì hover lên nút "Details" để xem SP này có id là gì thì sẽ biết prodId truyền tới đây, VD product (không phải card thẻ) đầu tiên hover lên "Details" thấy localhost:3001/products/1 là biết SANPHAM.id = 1
    let fetchedCart; //undefined value and undefined type now
    //I'll first of all, get access to the cart trong Association 1-1 with User, in exactly the same way khi req.user.getCart() 
    req.user
    .getCart() //nhận dòng cart có id=1 trong bảng carts có userId=1
    //Promise trả lời 1 cart duy nhất có ID=1 (theo cơ chế SQL của Sequelize)
    .then(cart=>{
      fetchedCart=cart; //now cart is available not only in this 1st then, but in overall function postCart!
        //in then() here I simply have access to the cart.
        //now we have the cart available.
        //next step, I want to find out if the product I'm trying to ADD với POST method is ALREADY part of the cart
           ///because if it is, then I just need to increase the quantity,
           ///if it's not I need to add it with a quantity of one.

        //now I retrieve products from the cart which have prodId to check
        return cart.getSANPHAMs({where:{id:prodId}}) //Xem trang /cart list các sản phẩm và chọn sản phẩm theo người dùng. Vậy kết quả trả về khi Promise fulfilled là gì?
    }) 
    
    .then(
        
        //cart ID=1 will get an Sequelize ARRAY of products as you learned but we know that this will only hold ONE product (có id là prodId) AT MOST, because it might even hold no product if a product with this ID is not part of this cart yet
        products=>{
            //I'll retrieve my single product as the first element of this array SANPHAMs but first of all I need to check if products length is greater than zero. Nếu bảng cartitems không có dòng nào hoặc SANPHAMid không có trong cart của user này
            //biến SANPHAMs sẽ không bị báo lỗi undefined vì nó là kết quả của fulfilled Promise, SANPHAMs là 1 mảng defined và không NULL, vì chứa địa chỉ trỏ tới 1 mảng có hoặc không có phần tử 
                /// khi khai thác SANPHAMs thì sp chứa trong nó phải xét  undefined , sự tồn tại
            let product; //undefined (both type and value), nghĩa là trong cart không có SP nào có id là prodId, nên đây là SP lần đầu vào cart, nên cho quantity=1
            
            if(products.length>0){ //nghĩa là mảng products đang chứa SP có id cần tìm. Nếu thêm 1 SP id y chang thì tăng số lượng lên 1
              product = products[0]; // (*) //ok. tiếp tục xử lý với if(product)
            }//ngược lại product tiếp tục undefined vì mảng products rỗng
            let newQuantity=1; 

            //Hiện product có 2 trường hợp: undefined (nếu mảng products rỗng) hay valid (mảng products có 1 product)
            //Let's check product is anything but undefined nghĩa là tiếp tục xử lý (*) ( if we actually do have a valid product). https://stackoverflow.com/questions/52849337/array-length-is-1-but-array0-is-undefined-in-javascript-why
            if(product){ //products.length>0, we have an existing product in the cart THE SAME AS the product we wanna add to the cart
               //now need to basically get my old quantity for this product and then change it.
               // I need to increase the quantity
               //We'll do this later because right now we don't have any products in cart ID=1 của user ID=1 so let's now only work on the new product case.
            }

            //So if we got no product  part of the cart ID=1 yet, we have to add a new product, muốn vậy first of all phải Product.findByPk 
            //I need to find the general product data for this product
            //not part of the cart but it's of course still in the database in the products table
            //I will have a nested then() here for easier 
            //because I will execute two very different kinds of code for the case

            //This is the case I add new product to the cart for the first time!
            return Product.findByPk(prodId)
                          .then(product=>{
                            //I know this is my product as it's stored in the products table and this is the product I want to add to my cart 
                            //How to access the cart here in THIS  anynomous function in THIS 3rd then? We an see cart is available in the above anynomous function in ABOVE 1st then()
                               /// tạo biến fetchedCart then store the cart in 1st then
                            return fetchedCart.addSANPHAM(product,{
                                //'quantity' là một thông tin của CartItem Class
                                //newQuantity=1 here and I'm storing the product with that quantity.
                                through:{quantity:newQuantity}
                            })//It's another magic method added by sequelize for many to many relationships
                            //I can add a single product here and I will add it to this in-between table cartItem with its ID.
                            /*
                               //Nhắc lại keyword: through =>  we use that to tell sequelize which model to use as the in between models and therefore as the in-between table,
                                Cart.belongsToMany(Product, {through:CartItem});   
                                Product.belongsToMany(Cart,{through:CartItem});
                                trong mối quan hệ Many-To-Many
                            */
                           // I'm telling sequelize, well for that in-between table, here's some additional information you need to set the values in there
                          })
                          .catch(err=>console.log(err));
            
        }
    )
    .then(()=>{
      res.redirect('/cart');
      //now I get an error on that cart page and that is what I mentioned before, this will now break.
    })
    .catch(err=>console.log(err));
    


    //Như vậy, khi là Sequelize-Express app, thì controllers sẽ gọi hàm của sequelize() nhiều hơn, còn folder models chỉ có Model class sẽ không có các user-defined methods nữa 
    //Khi không dùng Sequelize-Express app, thì folder models sẽ định nghĩa class và các hàm user-defined của nó. Trong controllers chỉ cần gọi tên hàm từ models


    
    //since we access a file in controllers như postCart and postCartDeleteProduct, theoretically we should use a callback here too (vì hành động getFile sẽ xảy ra thời gian lâu).
    /*
    Product.findById(prodId, product => {
      //Hàm này phải chờ findById() thực hiện mất một time dài thì mới chạy
      Cart.addProduct(prodId, product.price);
    });
    
    res.redirect('/cart');
    */
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
