const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product', //navigation item to be highlighted 
    
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

exports.getEditProduct = (req, res, next) => {
  //you can access your data here by simply trying to access the keys you got in your query parameters.
  const editMode=req.query.edit; //Express's query object 
  //localhost:3000/admin/edit-product/123245?edit=true  
      /// nên editMode = true   vế phải là string , khi path có  edit = "true" thì không bị redirect về '/'
  //Nếu không tìm ra key edit, thì undefined sẽ trả về false trong boolean check, lúc đó bị redirect về '/'
  //Important note: The extracted value always is a STRING! So "true" instead of true  
  if(!editMode){
    return res.redirect('/');
  }
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product', //navigation item to be highlighted 

    //pass an additional information field to our view admin/edit-product
    editing:editMode //so that we can check this with the if condition to find out
  });
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
