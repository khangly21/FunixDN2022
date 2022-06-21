const Product = require('../models/product'); // a sequelize model (instance), now is imported here so that Controller can order it to use methods in sequelize library
const Cart = require('../models/cart'); //we don't need this because we NEVER directly use the Cart class 
const Order=require('../models/order'); 

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
                      products=>{ //Sequelize object products chứa đủ thông tin về cartitem này (thuộc cart nào và cart này thuộc user có ID là gì)
                        //console.log("Mảng các products trong cart, mảng này được gửi tới view shop/cart: \n",products);
                        //console.log("Đối tượng sản phẩm trong cart được Sequelize thêm 1 thuộc tính là cartItem: \n",products[0].dataValues.cartItem); //ok, đối tượng này chính là cartitem ID=1 trong bảng cartItem
                         //of course means that we can now render these products in view.

                          console.log("Cấu trúc của mảng cartitems với 2 sản phẩm trước khi chuyển mảng này cho view: \n",products);

                          res.render('shop/cart', { //TRANG của nút PRODUCTS cũng có nút "Add to cart", vậy có render tới đó không
                              path: '/cart',
                              pageTitle: 'Your Cart',
                              //gửi mảng tới view 'shop/cart' cho nó khai thác thông tin products trong cart
                              //nếu không có product nào thì cartProducts là 1 empty array , and I can check that with EJS template
                              products:products //store them in products and pass them to the view. Phải biết cấu trúc của products thì mới phân tích render ra view được 
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

};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId; //trước khi bấm nút "Add to Cart" thì hover lên nút "Details" để xem SP này có id là gì thì sẽ biết prodId truyền tới đây, VD product (không phải card thẻ) đầu tiên hover lên "Details" thấy localhost:3001/products/1 là biết SANPHAM.id = 1
    let fetchedCart; //undefined value and undefined type now
    let newQuantity=1; //top level variable
    //I'll first of all, get access to the cart trong Association 1-1 with User, in exactly the same way khi req.user.getCart() 
    req.user
    .getCart() //access cart được req.user.createCart() trong app.js lúc npm start. 
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
        //Promise này sẽ trả về 1 mảng products hoặc rỗng [], hoặc mảng chứa 1 đối tượng cartitem như: [{id:prodId,quantity:5}]
    }) 
    
    .then(
        
        //cart ID=1 will get an Sequelize ARRAY of products as you learned but we know that this will only hold ONE product (có id là prodId) AT MOST, because it might even hold no product if a product with this ID is not part of this cart yet
        products=>{

            /*
              //nên comment out nhóm này, vì khi có SP mới được Add Products vào CSDL, thì sẽ báo lỗi undefined userId, cartItem
                console.log("Mảng sản phẩm trả về từ cart.getSANPHAMs() với id của sản phẩm do người dùng post: \n",products)
                console.log("SANPHAM của cart này thuộc về admin user nào? \n",products[0].userId); //1
                console.log("SANPHAM có thuộc tính cartItem do Sequelize thêm vào để truy cập in-between table cartitems \n",products[0].cartItem,Array.isArray(products[0].cartItem));
                console.log("SANPHAM có số lượng bao nhiêu trong cart? \n",products[0].cartItem.quantity); //12
                console.log("SANPHAM này nằm trong cart nào? \n",products[0].cartItem.cartId); //1
                console.log("Tìm SP theo id trong bảng sanphams: \n",Product.findByPk(prodId)); //Promise{<pending>}
            */



            //I'll retrieve my single product as the first element of this array SANPHAMs but first of all I need to check if products length is greater than zero. Nếu bảng cartitems không có dòng nào hoặc SANPHAMid không có trong cart của user này
            //biến SANPHAMs sẽ không bị báo lỗi undefined vì nó là kết quả của fulfilled Promise, SANPHAMs là 1 mảng defined và không NULL, vì chứa địa chỉ trỏ tới 1 mảng có hoặc không có phần tử 
                /// khi khai thác SANPHAMs thì sp chứa trong nó phải xét  undefined , sự tồn tại
            let product; //undefined (both type and value), nghĩa là trong cart không có SP nào có id là prodId, nên đây là SP lần đầu vào cart, nên cho quantity=1
            
            if(products.length>0){ //nghĩa là mảng products đang chứa SP có id cần tìm. Nếu thêm 1 SP id y chang thì tăng số lượng lên 1
              product = products[0]; // (*) //Now product is NOT UNDEFINED , so valid. tiếp tục xử lý với if(product) để phân biệt với undefined product
            }
            
            //ngược lại product tiếp tục undefined vì mảng products rỗng
            

            //Hiện product có 2 trường hợp: undefined (nếu mảng products rỗng) hay valid (mảng products có 1 product)
            //Let's check product is anything but undefined nghĩa là tiếp tục xử lý (*) ( if we actually do have a valid product). https://stackoverflow.com/questions/52849337/array-length-is-1-but-array0-is-undefined-in-javascript-why
            if(product){ //products.length>0, we have an existing product in the cart THE SAME AS the product we wanna add to the cart
               //now need to basically get my old quantity for this product and then change it.
               // I need to increase the quantity
               //We'll do this later because right now we don't have any products in cart ID=1 của user ID=1 so let's now only work on the new product case.
               //simply increment the quantity. I essentially want to get my old quantity first of all which I can get from my product by accessing cart item as we just did it in the view hoặc trong action getCart    
               //Trong products[0].dataValues.cartItem.quantity, thì cartItem is this extra field that gets added by sequelize to give us access to this in-between table
               
               const oldQuantity=product.cartItem.quantity; //retrive the quantity of this cartitem at the moment
               //sequelize does not just give us access to the in-between table but to this exact "product" in the in-between table
               newQuantity=oldQuantity+1;
               console.log("khi có SP có SANPHAMid x xếp hàng muốn thêm vào cart đã có SANPHAMid x này trước đó, thì newQuantity của SP này trong cart là: \n",newQuantity);//newQuantity=24
               return product; //Thoát hàm, muốn debug các code tiếp theo, phải "comment out" return product chỗ này để chạy tiếp bên dưới, CÓ KHÁC GÌ product ban đầu??? Trước hết, quantity=23 chưa +1 nên chưa liên quan gì tới newQuantity , lý dó là muốn có newQuantity thì phải trải qua fetchedCart.addSANPHAM(product,{through:{quantity:newQuantity}}) ở then kế tiếp
               //đây là product của cart chứ không phải product của bảng sanphams
               //yêu cầu cart thêm product này vào, kèm theo "though call" để set quantity (vì Sequelize không cho access in-between table ??)
               /*


                    // block này được chuyển qua then kế tiếp
                    return fetchedCart.addSANPHAM(product,{
                      through:{quantity:newQuantity}
                    })



               */
               // cả 2 trường hợp mảng products rỗng và mảng products có 1 SP , return Promise từ fetchedCart.addSANPHAM() như nhau
               //Promise này sẽ được xử lý tiếp tục trong then kế tiếp
            }

            //So if we got no product  part of the cart ID=1 yet, we have to add a new product, muốn vậy first of all phải Product.findByPk 
            //I need to find the general product data for this product
            //not part of the cart but it's of course still in the database in the products table
            //I will have a nested then() here for easier 
            //because I will execute two very different kinds of code for the case

            //This is the case I add new product to the cart for the first time!
            console.log("Tìm SP theo id trong bảng sanphams: \n",Product.findByPk(1));//sẽ không chạy vì bảng sanphams có 1 sp nên chạy if(product) và return thoát hàm,để ngăn chặn thoát hàm chỗ đó thì bỏ return đi
            return Product.findByPk(prodId) 
             
                          /*
                          //block sau bỏ vì return fetchCart.addSANPHAM sẽ được chuyển tới then kế tiếp
                          .then(product=>{
                            //I know this is my product as it's stored in the products table and this is the product I want to add to my cart 
                            //How to access the cart here in THIS  anynomous function in THIS 3rd then? We an see cart is available in the above anynomous function in ABOVE 1st then()
                               /// tạo biến fetchedCart then store the cart in 1st then
                            
                            return fetchedCart.addSANPHAM(product,{
                                //'quantity' là một thông tin của CartItem Class
                                //newQuantity=1 here and I'm storing the product with that quantity.
                                through:{quantity:newQuantity}
                            
                            })
                          */
                            
                            
                            //It's another magic method added by sequelize for many to many relationships
                            //I can add a single product here and I will add it to this in-between table cartItem with its ID.
                            /*
                               //Nhắc lại keyword: through =>  we use that to tell sequelize which model to use as the in between models and therefore as the in-between table,
                                Cart.belongsToMany(Product, {through:CartItem});   
                                Product.belongsToMany(Cart,{through:CartItem});
                                trong mối quan hệ Many-To-Many
                            */
                           // I'm telling sequelize, well for that in-between table, here's some additional information you need to set the values in there
                          //})
                          //.catch(err=>console.log(err));
            
        }
    )
    .then(product=>{ //2 trường hợp return ở then trước đều trả về product
        //tắt return khi if(product) để console.log xem product khi if(!product)
           ///console.log("Product.findByPk(prodId)",product); //xảy ra khi bỏ 'return product;' để có then(product=>{}) của 'return Product.findByPk(prodId)' 
        //console.log("product của mảng SP của cart trùng id người dùng muốn postCart: \n",product);
        //đón xử lý của cả if(product) và if(!product)
        //the difference is that data here actually should hold both the product that needs to be added and our quantity


        //hiện trong bảng cartitems thì valid product của cartId=1 và userId=1 đang có quantity=19
        console.log("return product khi cart đã có 1 SP: \n",product);
        console.log("cartitem này có thuộc tính cartItem (chứa quantity trước khi +1 để ra view) là: \n",product.cartItem);
        console.log("cartitem này có thuộc tính _options là: \n",product._options);
        //console.log("cartIttem's options có parent là: \n", product._options.include[0].parent);

        return fetchedCart.addSANPHAM(product,{
          //trong cart thì vừa có SP vừa có quantity liên quan. Nên through sẽ giúp cập nhật quantity
          through:{quantity:newQuantity}  //hiện nay product hay cartitem có quantity=20 , throught sẽ giúp cập nhật quantity = newQuantity = 20+1=21
        })
    })
    .then((updated_quantity_cartitem)=>{

      console.log("cartitem đã cập nhật quantity là: \n",updated_quantity_cartitem[0]); //1 ???
      res.redirect('/cart');
      
      //Tóm lại:
      //có 2 rẽ nhánh cho quantity: = 1 hay =oldQuantity+1 . Cả 2 trường hợp đều là biến top-level newQuantity cho mặc định là 1 
      //therefore new quantity is available in all then blocks and we either leave it at one (=1) here or if we got a product
      //cả 2 trường hợp if(product) và if(!product) đều trả về product . Và product này sẽ  automatically wrapped by a promise  để tới then tiếp theo

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

exports.getCartDeleteProduct=(req,res,next)=>{
    //Bước 1:Nhận tham số từ GET request
    const prodId=req.query.productId;
    console.log("Mã sản phẩm cần xóa khỏi cart: \n",prodId); //ok
    //Bước 2 : Nhờ Sequelize thực hiện sql
    req.user
       .getCart()
       .then(cart=>{//I know that I've got access to my cart, my wrapped-by-Promise cart
           //in that cart, I now want to find the products for this user and to be precise, the products, not all products but the product with that product ID. 
           return cart.getSANPHAMs({where:{id:prodId}});//fulfilled Promise sẽ trả về 1 mảng rỗng hay 1 mảng chứa SP cần tìm
  
       })
       .then(products=>{//mảng các sản phẩm trong cart
          //and I have to extract that exact product I'm looking for as the first element in the products array
          const product=products[0]; //biến products được accessed after initialization

          //Mục tiêu:  to destroy that product but not in the products table of course but only in that in-between cart item table that connects my cart with that product
             /// simply call product.cartItem(); using that magic field sequelize gives me to access the element in the in-between table and then destroy
          product.cartItem.destroy(); //will remove cartitem from that in-between table.
          //TypeError: product.cartItem is not a function
       })
       .then(result=>{
          //kết thúc req-res cycle
          res.redirect('/cart');
       })
       .catch(err=>console.log(err))

    

};

exports.postOrder=(req,res,next)=>{
    //postOrder here should now take all the cart items and move them into an order
    //First, get all the cart items by accessing the req.user . This gives me access to the cart
    req.user
       .getCart()
       .then(cart=>{
          //now I can access to the cart
          //so I can access all cart-items  
          return cart.getSANPHAMs();//this will return all products by default
       })
       .then(products=>{
          console.log("các sản phẩm trong giỏ hàng được checkout: \n",products);
          //khi click "Order now" thì đọc cấu trúc của Sequelize object này trong console
          //Mô tả: tất cả SP trong mảng thuộc cart đều có userId=1, tất cả SP đều chứa thuộc tính cartItem

          console.log("Thuộc tính cartItem của SP thứ nhất của cart: \n",products[0].cartItem); 
          console.log("Thuộc tính cartItem của SP thứ hai của cart: \n",products[1].cartItem); 
          //We have accessed the products successfully.
          //now the idea is that we move the products into a newly created order. So we import Model class Order , cũng không cần import Order vì có thể dùng lệnh Sequelize sau :
          return req.user.createOrder()
                         .then(
                           //I get my created order Sequelize object
                           order=>{
                              //I want to associate my products to this order
                              //cấu trúc order-item là {id,orderId, SANPHAMId, quantity} cũng như cấu trúc cart-item  {id, cartId,SANPHAMId, quantity}
                              //trước kia khi thực hiện hành động postCart thì chỉ cần add 1 SP duy nhất vào cart nên dễ , nếu là SP chưa có trong cart thì newQuantity=1, nếu có trước đó thì newQuantity=oldQuantity+1
                              /*
                                    fetchedCart.addSANPHAM(product,{
                                          //trong cartitem thì vừa có SP vừa có quantity liên quan. Nên through sẽ giúp cập nhật quantity
                                        
                                          through:{quantity:newQuantity}  //hiện nay product hay cartitem có quantity=20 , throught sẽ giúp cập nhật quantity = newQuantity = 20+1=21
                                    })
                              
                              */
                              
                              //ORDERITEM có cấu trúc tương tự CARTITEM, khác ở chỗ ORDERITEM thì postOrder đồng loạt rất nhiều sản phẩm, còn CARTITEM mỗi lần postCart chỉ 1 SP thôi
                              //now which value would we assign to "through" because we get different quantities for all the products that is lining up to the Order ?
                              //The approach is a little different, we don't pass quantity to "through" like postCart did 
                              //we just pass products to addSANPHAMs() but EACH product needs to have a special key, a special field which is then understood by sequelize.
                              //to assign that special field I'm talking of, the products we pass in here have to be modified and we can do this with the map() https://www.w3schools.com/jsref/jsref_map.asps
                              //Why map()? a default javascript method that runs on an array and returns a new array with slightly modified elements.
                                 /// map nhận function làm tham số để modify các phần tử của mảng gọi nó
                                 /// add a function to map() here that is executed for every element in the array and takes the element as an input, and return the modified array version 
                                 /// element đó là product đang chờ vào Order  , I do edit it slightly, a new property "orderItem" which sequelize will look for named orderItem.
                                 //Lưu ý là Sequelize array products của cart có được bằng  req.user.getCart().then(cart=>{return cart.getSANPHAMs()})  chưa có thuộc tính "orderItem" (vì chưa thực hiện được order.addSANPHAMs() lúc này) , nhưng có thuộc tính "cartItem" là record trong bảng cartitems do nằm trong cart
                              //phải thực hiện thành công order.addSANPHAMs() thì Sequelize object products sẽ có thêm property là "orderItem"
                              //chú ý mỗi product trong cart đều có thuộc tính đặc biệt được Sequelize thêm vào là: "cartItem" , tên thuộc tính này phải trùng tên modelName là 'cartItem'
                              //tương tự, mỗi product trong cart muốn thêm thuộc tính "orderItem" và tên này phải trùng tên modelName là "orderItem"
                              return order.addSANPHAMs(products.map(product=>{
                                  //product trong cart không có thuộc tính orderItem, nên sẽ thêm thuộc tính này để stores a javascript object where I configure the value for this in-between table "orderitems"
                                  product.orderItem={quantity:product.cartItem.quantity}; //cartItem chính là tên của related table đã ghi rõ trong model 
                                  // I get the quantity from the cart and store that for the order item, (vì tui có thể access cartitem trong cart)
                                  return product;
                                  //đã thực hiện xong việc cho product vào trong order 
                                  //vậy sẽ có products phiên bản mới, với product từ cart được thêm thuộc tính orderItem regarding the quantity for my order and order.addSANPHAMs() will pick this up and add the products to the order with that quantity.
                              })); 

                           }
                             
                         )
                         .then(any_result=>{
                            //kết thúc req-res cycle
                            res.redirect('/orders');
                         })
                         .catch(err=> console.log(err))
                         ;
          //you can always restructure it to not use a nested promise here though if you want
          //cũng như đã req.user.createCart() khi khởi động app ở app.js 
          //we don't just need the order, we also need to associate our products to that order (Mối liên kết này hiện chưa có trong sơ đồ ERD)
       })
       .catch(err=>console.log(err));
}

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
