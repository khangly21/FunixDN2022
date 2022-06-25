const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  // gán theo thứ tự constructor(title,price,description,imageUrl)
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description; 
  const imageUrl = req.body.imageUrl;
  

  //we'll pass all that data into the constructor of the product.
  const product=new Product(title,price,description,imageUrl); //phải đúng thứ tự đã định nghĩa: constructor(title,price,description,imageUrl). Nếu gán dữ liệu cho new Product(title,imageUrl,price,description); thì sẽ nhận được price="https://cdn.chess24.com/....." và render sai
  product
      .save() //tạo dòng dữ liệu đầu tiên, dẫn tới MongoDB tạo bảng và collection products
      .then(result_from_return=>{ 
            console.log(result_from_return); //undefined
            console.log('Created product!');
            res.redirect('/admin/products')
      })
      .catch(err=>console.log(err));
}   
