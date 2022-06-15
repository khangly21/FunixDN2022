const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);//ok, khi gửi form thì người dùng không cần viết id cho SP vì nó được tạo tự động bằng hàm Math() 
  product
  .save()
  .then(()=>{
      res.redirect('/');
  })
  .catch(err=>console.log(err)); 
  //Khi lưu file, Lúc này phát hiện product gọi hàm save() này có this.id == NULL, do đó sẽ update this.id = Math.random().toString(); Còn lưu vô CSDL MySQL thì id tự động được gán
  
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("id: ",prodId);
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postDeleteProduct=(req,res,next)=>{
    //extract productId trong input hidden của form post 
    const prodId=req.body.productId ;
    console.log("prodId",prodId);
    Product.deleteById(prodId);
    res.redirect('/admin/products'); //the same khi updatedProduct.save();
}