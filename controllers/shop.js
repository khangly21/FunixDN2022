//Controller gets access/reference to Model Sanpham để có thể gọi các hàm xử lý dữ liệu static  hay  nonstatic
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  //Controller không cần yêu cầu Model tạo instance để gọi find() vì find() là static method, nên dùng Model để gọi trực tiếp
  Product.find()//mongoose find() trả về cho Controller các products. Tui có thể get access to cursor Product.find().cursor().next() which gets the next element hay Product.find().cursor().eachAsync() which would allow us to loop through them
  //I will just use mongoose's find and this will essentially give me all my `products` automatically.
  //một thời gian sau, Model sẽ return cho Controller 'products'
  .then(products=>{
    console.log(products); //mảng
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => {
    console.log(err);
  });


  // Product.fetchAll()
  //   .then(products => {
  //     res.render('shop/product-list', {
  //       prods: products,
  //       pageTitle: 'All Products',
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};

exports.getProduct = (req, res, next) => {
  //extract prodId từ GET req
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));

  //good thing is Sanpham is Mongoose model and mongoose indeed has a findById() which is static method,
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
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
    .getCart()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
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
    .addOrder()
    //simply execute this method and then redirect
    .then(result => {
        //execute addOrder() successfully, done created first order document then created "orders" collection then cập nhật locally req.user.cart.items về [] sau đó cập nhật Mongodb user.cart.items thành []  
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    //Javascript array is sent back
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
