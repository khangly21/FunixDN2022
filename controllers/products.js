const products = []; //Controller tương tác dữ liệu

//Controller là nơi chứa các hàm xử lý  gắn với Route

//Khi người dùng yêu cầu trang chứa form để thêm product
exports.getAddProductPage=(req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }

//Remember with this syntax, we can have multiple exports in one file easily.
//using exports and then any name of our choice
//still is a normal middleware function


//Sau khi submit new product
exports.postAddProduct= (req, res, next) => {
  //the problem is we are refering to dữ liệu products
    products.push({ title: req.body.title });
    res.redirect('/');
}

//  route / để nhận danh sách sản phẩm khi chọn menu Shop
exports.getProducts=(req, res, next) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
}