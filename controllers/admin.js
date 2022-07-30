//import the Mongoose models
const Sanpham = require('../models/product');

//lookup view "/admin/products" in views directory "views"

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product', //http://localhost:3000/admin/add-product
    editing: false,  //thì nút cuối cùng sẽ là "Add Product"
    sessionViews: req.session.views,
    isAuthenticated:req.session.user //dùng req.user.isLoggedIn cũng ok
  });
};

exports.postAddProduct = (req, res, next) => {
  //body của POST form sẽ được gắn vào đối tượng req.body 
  console.log("req.body sau khi hành động postAddProduct: \n",req.body); 
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
      imageUrl:imageUrl,
      
      //Cần chú ý đây là user lấy trực tiếp từ req.session 
      userId:req.session.user //đã cập nhật lưu user trong req.user, tại sao req.user còn tác dụng ?? Lý do là trong app.user lúc tìm user rồi gán req.user rồi
  }); 
  
  //gọi hàm CUSTOM và nonstatic
  product.speak(); //ok
  req.product=product;
  req.product.speak(); //ok
  //Thêm 1 thuộc tính cho sessions trên mongodb
  req.session.product=product;
  req.session.product.speak()
  //gọi BUILT-IN instance method là updateOne
  req.product.updateOne({title:'rainbow'}, {price: 666},function(err, docs){
    if (err){console.log(err)}
    else{console.log("Updated Docs by req.product: ", docs);}
  })
  req.session.product.updateOne({title:'rainbow'}, {price: 777},function(err, docs){
    if (err){console.log(err)}
    else{console.log("Updated Docs by req.session.product: ", docs);}
  })
  



  //Mối quan hệ giữa Manager và Worker: https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis/
  //Controller yêu cầu Model (khuôn, blueprint) Sanpham creates a new product instance có kế thừa các hàm xử lý lưu trữ (đọc, ghi) của Mongoose.Model class, Model sẽ trả lại access tới instance so that "manager" controller can order this "worker" product to implement nonstatic save()
  //Thực ra Model cũng là "worker" nếu Controller cần static method của Sanpham, thì Controller yêu cầu trực tiếp Sanpham thực hiện save()
  product
    //nếu product đã có trong db thì update, không có thì insert
    .save()//** such a product happens to have or such a model happens to have a save method now provided by mongoose, we have not defined, but mongoose provides
    //https://dev200ok.blogspot.com/2020/05/ios-ios-mvcmodel-view-controller.html
        /// save chính là hàm xử lý dữ liệu, nói cách khác là dịch vụ đăng ký SP mới "INSERT INTO ... VALUES ..." do mongoose cung cấp 

    /*
        we can indeed call then() on that, technically we don't get a promise but mongoose still gives us a then method, it also still gives us a catch method
    */
   //sau khi save thì collection "Sanpham" hình thành trong db tên là "testMongoose" ? Không vì 
    .then(result => {
      // console.log(result);
      console.log('Created Product. Creating documents (writing to database) is one of 2 responsibilities of Model: creating and reading documents to and from database');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;  //http://localhost:3000/admin/edit-product/62c2a98a5a21d4b9a8661e77?edit=true
  console.log('giá trị editMode:', editMode); //false
  console.log(!editMode) //false , do đó if sau sai
  /*
  
  if (!editMode) {
    console.log("redirect to /")
    return res.redirect('/');
  }
  */

  if(editMode==false){
    console.log("redirect to /")
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  //hàm Model.findById() là built-in Database Query của Mongoose
  //trong Mongoose còn có Model.find() và trả về mảng products
  Sanpham.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }

      
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product', 
        editing: editMode,  
        product: product,
        sessionViews: req.session.views,
        isAuthenticated:req.session.user //nối tiếp chuỗi khởi đầu từ postLogin,
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
  
  
  Sanpham.findById(prodId)
    //tui biết "worker" service sẽ phản hồi tui 1 product which was fetched from the MongoDB, có thể dùng callback thay vì Promise
    .then(product=>{//I got a full mongoose model với cool mongoose methods //cập nhật các fields muốn update
      // if we call save on an existing  Mongoose document object, it will not be saved as a new one but the changes will be saved, so it will automatically do an update behind the scenes.
      product.title=updatedTitle;
      product.price=updatedPrice;
      product.description=updatedDesc;
      product.imageUrl=updatedImageUrl;
      //cool thing is :  product now NOT be a javascript object with the data but we will have a full mongoose object here with all the mongoose methods like save
      return product
         .save() //chỉ là save thôi thì không có gửi đối tượng nào tới view hết, do đó chọn res.redirect

    })
    .then(product => {
        console.log("Đã save product sau vào MongoDB:" ,product);
        console.log('UPDATED PRODUCT!');
        //sau khi save xong thì redirect , vì không cần gửi thông tin cho view để hiển thị
        res.redirect('/products/');
    })};

exports.getProducts = (req, res, next) => {

  //mongoose find() gives us the documents and a cursor. Trong khi MongoDB driver chỉ cho a cursor
  Sanpham.find()
    .then(products => {
      console.log("getProducts log nội dung của products: \n",products);

      
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
        sessionViews: req.session.views,
        isAuthenticated:req.session.user   //nối tiếp chuỗi khởi đầu từ postLogin,
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  //Sanpham.del... có offers deleteOne và deleteMany, tại sao không chọn? xem ý nghĩa deleteOne là chọn doc đầu tiên thỏa điều kiện
  //findByIdAndDelete is a built in method provided by mongoose that should remove a document
  
  Sanpham.findByIdAndDelete(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      //đã xóa thành công, không cần hiển thị ở view nào, nên redirect 
      res.redirect('/admin/products');
      }) //redirect vào chính trang này luôn
      //nếu res.render('/admin/products'); thì delete thành công nhưng Error: Failed to lookup view "/admin/products" in views directory "views" hay Error: Failed to lookup view "/admin/products.ejs" in views directory "views"
    
    .catch(err => console.log(err));
};
