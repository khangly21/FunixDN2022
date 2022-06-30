const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products, //product lấy từ MongoDB nên phải có thuộc tính _id, chứ không phải id
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log("prodId là: \n" , prodId);
    Product.findById(prodId)
      //nếu id không tồn tại trong MongoDB (VD yêu cầu Mongo tìm biến id trong khi mongo chỉ hiểu _id nên báo lỗi ReferenceError: id is not defined)
      //biến product sau có thể undefined, có thể null. Do đó check bằng (undefined)=> false , (null) => false
      .then(product => { //biến này có thể undefined hoặc null, do đó thường được xét if(product) , tức là true nếu defined product AND non-null product
          //if(product){  //Nếu dùng if thì đi chung res.send("Không tìm thấy product nhé! có thể access nhầm db hay nhầm collection 'products' thành 'product'");
              console.log(`product được tìm thấy theo ${prodId}`,product);

              res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title, //nếu product undefined thì catch(err) chỗ này, "Cannot read properties of undefined (reading 'title')"
                path: '/products'
              });

          //}
          //res.render("Không tìm thấy product nhé!");  Báo lỗi Error: Failed to lookup view "Không tìm thấy product nhé!" in views directory "views"
          //res.send("Không tìm thấy product nhé!"); //http://localhost:3005/products/62b5aa5b371f9116902df979 hiển thị Không tìm thấy product nhé!
          //Tuy nhiên có res.send thì đã hoàn tất req-res cycle, nên việc báo lỗi sẽ trực tiếp trên màn hình user, bỏ qua catch nếu không có res thì sẽ nhảy xuống catch
      })
      //Không tìm ra product thì sẽ err
      .catch(err => 
        {
          console.log("Báo lỗi từ catch error trong khi getProdutc với prodId: \n",err);
        }
      );
};

exports.getIndex = (req, res, next) => {
  //debug
  console.log("hello, I am getIndex");

  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart() //Nếu trong class User chưa định nghĩa hàm này thì TypeError: req.user.getCart is not a function (ý nói biến getCart này không lưu đối tượng hàm access nên không gọi () được)
    //trong lúc then(products) chờ kết quả của getCart() thì chạy console.log('res được gọi trước khi products được fetch thành công'); và res.redirect('/') trước
    .then(products => {

              console.log("Đã fetched thành công products");

              res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products  //render our view with the products we fetched.
              });
    })
    .catch((err) =>{
      console.log(err);
      // có thể res.redirect
    });
    //Tại sao sau khi postCart thấy req có mà res không có (trang bị treo không tới view nào hết)
    
    console.log('res được gọi trước khi products được fetch thành công');
   
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
           .then(product=>{
              req.user.addToCart(product); 
              //req.user.addToCart_Lab6_16(product);  //thì cart chỉ có 1 product duy nhất, postCart sp nào thì ghi đè lên , cuối cùng 1 cart chỉ có 1 product
           })
           .then(result=>{
              console.log("Xem result của ADD-TO-CART operation in database mongodb: \n",result); 
              res.redirect('/cart');  //the important part is that we redirect at some point
           })
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({include: ['products']})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
