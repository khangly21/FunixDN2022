//import Model
const Product=require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
    //now create a new object based on this class blueprint and that is what classes are in the end, they are blueprints
    const product=new Product(req.body.title);
    //one additional thing that needs to be done though, I want to save
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  const products=Product.fetchAll();
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
};
