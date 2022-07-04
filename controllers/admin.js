//import the Mongoose models
const Sanpham = require('../models/product');

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
  //pass 1 argument only which is an object javascript object where we map the different values we defined in our schema
  //we map title to title, imageUrl to imageUrl
  //go through all the fields you defined in the schema, the order does not matter though since it's in a javascript object
  
  //Chỉ có Mongoose là tiếp xúc trực tiếp Database, mà Moongoose thì có Mongoose Model (bao trùm Mongoose Schema)
  //thực thể product sau có typeof Document
  const product = new Sanpham({
    //the part on the left side of the colon refers to the keys you defined in your schema, trong object thì thứ tự nào cũng được
      title:title,
      price:price,
      description:description,
      imageUrl:imageUrl
  }); 
  
  //Mối quan hệ giữa Manager và Worker: https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis/
  //Controller yêu cầu Model (khuôn, blueprint) Sanpham creates a new product instance có kế thừa các hàm xử lý lưu trữ (đọc, ghi) của Mongoose.Model class, Model sẽ trả lại access tới instance so that "manager" controller can order this "worker" product to implement nonstatic save()
  //Thực ra Model cũng là "worker" nếu Controller cần static method của Sanpham, thì Controller yêu cầu trực tiếp Sanpham thực hiện save()
  product
    .save()//** such a product happens to have or such a model happens to have a save method now provided by mongoose, we have not defined, but mongoose provides
    //https://dev200ok.blogspot.com/2020/05/ios-ios-mvcmodel-view-controller.html
        /// save chính là hàm xử lý dữ liệu, nói cách khác là dịch vụ đăng ký SP mới "INSERT INTO ... VALUES ..." do mongoose cung cấp 

    
    
    
    /*
        we can indeed call then() on that, technically we don't get a promise but mongoose still gives us a then method, it also still gives us a catch method
    */
   //sau khi save thì collection "Sanpham" hình thành trong db tên là "testMongoose" ? Không vì 
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  //hàm findById là built-in của Mongoose
  Sanpham.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;

  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  
  // const product = new Sanpham(
  //   updatedTitle,
  //   updatedPrice,
  //   updatedDesc,
  //   updatedImageUrl,
  //   prodId
  // );
  
  Sanpham.findById(prodId)
    //tui biết "worker" service sẽ phản hồi tui 1 product which was fetched from the MongoDB, có thể dùng callback thay vì Promise
    .then(product=>{//I got a full mongoose object //cập nhật các fields muốn update
      // if we call save on an existing  Mongoose document object, it will not be saved as a new one but the changes will be saved, so it will automatically do an update behind the scenes.
      product.title=updatedTitle;
      product.price=updatedPrice;
      product.description=updatedDesc;
      product.imageUrl=updatedImageUrl;
      //cool thing is :  product now NOT be a javascript object with the data but we will have a full mongoose object here with all the mongoose methods like save
      return product
         .save()
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');

      //trong form, sau khi nhấn Update Product sẽ tới action="/admin/edit-product http://localhost:3000/admin/edit-product là trang "Page Not Found", nhưng tại đây bị redirect
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {

  //mongoose find() gives us the documents and a cursor. Trong khi MongoDB driver chỉ cho a cursor
  Sanpham.find()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
