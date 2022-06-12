const Product = require('../models/product');

//cả việc nhấn "Add Product" và "Edit" đều hướng tới view 'admin/edit-product', khi đó cần check điều kiện editing
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false  //vì sao true thì báo lỗi. Biến editing truyền tới view sẽ available trong template admin/edit-product
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

//yêu cầu trang hiển thị bằng get
exports.getEditProduct = (req, res, next) => {
  //http://localhost:3000/admin/edit-product/123245?edit=true
  const editMode = req.query.edit;//lấy giá trị của key "edit",lúc nhấn nút Edit dưới sản phẩm thì cũng cho true <a href="/admin/edit-product/<%= product.id %>?edit=true" class="btn">Edit</a>
  //Trường hợp không tìm ra giá trị của edit thì editMode sẽ undefined
  if (!editMode) { //http://localhost:3000/admin/edit-product/123245
    return res.redirect('/'); 
  }
  //by this name 'productId' we can extract the Product ID.
  const prodId = req.params.productId;//123245
  //use Product model to find product which will then be processed by callback 
  Product.findById(prodId, product => {
    if (!product) { //if(product == NULL) we don't have a product, nghĩa là !product = invalid product or undefined product
      return res.redirect('/'); //not the best user experience, most of the time you would want to show an error instead
    }
    res.render('admin/edit-product', {  //là view admin/edit-product http://localhost:3000/admin/edit-product hiện Page Not Found
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode, //we're setting this editing property here so this is a variable available in the EJS template.
      product: product //I also pass product information into my view admin/edit-product, do đó product information sẽ available trong view để sử dụng
    });
  });
};

exports.postEditProduct=(req,res,next)=>{
    //req object, res object, next function 
    // we basically want to construct a new product and replace the existing one with this product
    //This means that we have to do some work on the product model

    //NEXT LECTURE !!!
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
