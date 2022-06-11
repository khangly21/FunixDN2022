const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => { //Mentor: products là kết quả trả về của hàm Product.fetchAll()
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;//Mentor trả lời: productId là một params mà người dùng gửi lên khi gọi API.
  Product.findById(prodId, product => { 
    //nội dung của hàm cb với đầu vào là product đã tìm thấy 
    // product là kết quả trả về của hàm Product.findById()
    res.render('shop/product-detail', {
      product: product, //truyền cả đối tượng product we đã retrived cho view shop/product-detail.  left side is simply the key by which we'll be able to access it in the view.
      pageTitle: product.title,  //vì trong partial head.ejs có biến pageTitle cần gán vào
      path: '/products' //trong partial navigation.ejs cần biết biến path có giá trị gì để determine which path that makes the navigation item be active
      //makes sense to highlight the "/products" link because we're still in the "/products" area, just in the detail for a single product.
      //If we want to highlight this, the path we should pass is /products
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
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
};
