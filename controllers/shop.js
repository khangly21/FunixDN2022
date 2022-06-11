const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products', //tab có tên All Products
      path: '/products'
      //có dãy các products, nhưng làm sao click Details thì tới link có /:id ?
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId); //log ra console id của product vừa chọn
  //res.redirect('/');
  res.send(`Bạn vừa chọn product có id ${prodId}. Trang này sẽ biểu diễn chi tiết product này`);
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', { //http://localhost:3000/shop/index.js hay http://localhost:3000/shop/index.html
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
