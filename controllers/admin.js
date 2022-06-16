//import Product model
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

  /*
  const product = new Product(null, title, imageUrl, description, price);//ok, khi gửi form thì người dùng không cần viết id cho SP vì nó được tạo tự động bằng hàm Math() 
  product
  .save()
  .then(()=>{
      res.redirect('/');
  })
  .catch(err=>console.log(err)); 
  //Khi lưu file, Lúc này phát hiện product gọi hàm save() này có this.id == NULL, do đó sẽ update this.id = Math.random().toString(); Còn lưu vô CSDL MySQL thì id tự động được gán
  */

  // will now create a new product here by calling one of the methods provided by sequelize 
  //cũng như mysql ngay phía trên, product.then().catch() 
  Product.create({
    //create() to build a new model instance and calls save on it, lý do là Product không có hàm save()
    //I don't need to assign an ID, that will be managed automatically 
    //left side refers to one of the attributes I defined in the model.
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description
    //as I said, create() will immediately save these to database.
  })
  .then(result=>{
    //in case it does not go wrong.
    //console.log(result);
    console.log('Created Product');
    //You might have noticed that we are not sending a response yet. This will follow later

    //res.redirect ở đây sẽ đảm bảo redirect sau khi SP được tạo vào CSDL thành công, nhưng sẽ không tới được catch nếu có lỗi xảy ra
       /// nhưng để sau catch cũng không thành vấn đề
    
  })
  .catch(
    //Trường hợp admin không nhập gì mà submit form luôn thì sao
    err=>{
       console.log(err);
    }
  )
  res.redirect('/admin/products');
};

// /admin/edit-product/2?edit=true => GET
exports.getEditProduct = (req, res, next) => {
  //nhận dữ liệu của biến edit trên route 
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  //nhận giá trị biến productId của route
  const prodId = req.params.productId;
  //yêu cầu Sequelize.Model Product thực hiện hành động Product.findByPk(prodId) trong Lab5.11,5.12,5.13 
  /*
       Product.findByPk(prodId) //Err: findById() is not a function. còn findOne(prodId) thì báo lỗi Err: The argument passed to findOne must be an options object, use findByPk if you wish to pass a single primary key value
          .then(product=>{//giả sử nhận Promise là product
            res.render('shop/product-detail', {
              product: product, //chỉ cần lấy đối tượng product trong mảng product
              pageTitle: product.title, //truy cập title của đối tượng product
              path: '/products'
            });
          })
  */
  Product.findByPk(prodId) 
        
         .then(product=>{
           //nếu người dùng viết lên URL id không có trong CSDL thì !product thì return thoát hàm trả về res.redirect(view '/'), còn product thì res.render(view admin/edit-product)
           if(!product){
              //Express thoát hàm Promise gửi về đối tượng res hướng tới view '/'
               return res.redirect('/');
           }
           //Nếu có product thì Express gửi về đối tượng res hướng tới view 'admin/edit-product' với một đối tượng thông tin  
            res.render('admin/edit-product',{
              pageTitle:'Edit Product',
              path:'/admin/edit-product',
              editing:editMode,
              product:product
            })
         })
         .catch(err=>console.log(err));
  
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId; //cho lên param được không??
  console.log("id: ",prodId);
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  /* //Cách làm cũ với class Product khi chưa có Sequelize.Model 
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  */
 
  Product.findByPk(prodId)
         //hover product sau thấy nó có kiểu là Model, nên nó chứa các hàm của class Sequelize.Model là Product
         //hover findByPk() thấy trả về Promise<...> , và (success) listener will always be called with a single instance
         //Who calls then()? Là Promised which is resolved by a Model product ,, do đó hàm trong then() sẽ nhận tham số là product
         .then(product=>{ //hover thấy product có kiểu Model, do đó sẽ có các hàm riêng cho nó từ sequelize 
            // ASYNC: phải mất một thời gian để Promise Product.findByPk(prodId) được resolved XONG thì hàm trong then() mới được thực thi (vì phải chờ xác định biến product có giá trị gì). Khi chạy từ nhận req.body tới các hàm trong then() , Nên ASYNC sẽ không chờ mà bỏ qua luôn nên redirect sẽ xảy ra trước việc update cho field
            //Với prodId thì product có thể tồn tại hay không tồn tại trong CSDL. Cả 2 cases này đều là Lời hứa thành công (không bị reject hay error) t
            //we can simply work with all the attributes our product has per our model definition
            product.title=updatedTitle;
            //Vẫn quy tắc cũ khi update không sửa trực tiếp dữ liệu. please note this will not directly change the data in the database though, it will only do it locally in our app, in our javascript app here for the moment.
            //Now as I said this will not directly edit it in the database
            //If you wanna save to CSDL, gọi Product.save();
            product.price=updatedPrice;
            product.description=updatedDesc;
            product.imageUrl=updatedImageUrl;
          
            //Tại sao không như thường lệ xét tham số product có if(!product) 
                /// Người dạy Udemy: If the product does not exist yet, it will create a new one but if it does as this one, then it will overwrite or update the old one with our new values.
            //do chưa save vào CSDL nên yêu cầu Product làm vậy
            return product.save() //HOVER thấy save() này được tối ưu hóa cho UPDATE ONLY những changed fields (mà những changed fields này được lưu trong product), nếu valiadate mà thấy product không được update thì NO SQL được performed
            //không phải Product.save() ?? Yes, Product là Sequelize.Model đại diện bảng SANPHAMs và không có hàm save(), còn product là đại diện 1 record và có hàm save()
            //hover save() sẽ thấy nó sẽ validate product, trả về Promise object that resolves to the saved instance, or rejects
            //save() trả về Promise resolved by saved instance, Promise này tiếp tục gọi then() 
            // do đó chỗ này hoàn toàn có thể .then() nhưng to not start nesting our promises which would yield the same ugly picture as nesting callbacks,       
            // thay vào đó,  return để thoát hàm then và tới hàm then tiếp theo, so we return the promise which is returned by save and we can simply add a then block 
         })
         //Promise được trả về từ save sẽ gọi then tiếp theo này
         .then(result=>{
           console.log("result: \n",result);
           console.log('UPDATED PRODUCT!'); //thực ra chỉ update 1 field thôi và override cả product
           /* (*) */
         })
         //Promise tạo bởi then sẽ tiếp tục gọi then() khác, cuối cùng sẽ gọi catch( )
         .catch(err=>console.error(err))
         
  res.redirect('/admin/products');
  //giả sử Admin nhất Update cho 1 field rồi được trở lại trang "Admin products", admin sẽ không thấy sự thay đổi ngay lập tức trên sản phẩm, mà phải reload mới thấy. Why? 
    ///javascript and nodejs simply executes your code from top to bottom
    ///but async operations thì khác, phải mất một thời gian để Promise Product.findByPk(prodId) được resolved XONG thì hàm trong then() mới được thực thi (vì phải chờ xác định biến product có giá trị gì). Khi chạy từ nhận req.body tới các hàm trong then() , Nên ASYNC sẽ không chờ mà bỏ qua luôn nên redirect sẽ xảy ra trước việc update cho field
    /// Solution: cho res.redirect chuyển tới (*) điều này có nghĩa nếu có err sẽ không tới new page, not good for User experience. But we will learn Error handling 
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
      //findAll() trả về 1 Promise_resolved_with_an_array_of_Model_instances ,  chính an_array_of_Model_instances là a THENable value to resolve
      //vì hover lên findAll() sẽ thấy "search for multiple instances", trả về Promise<Model(any,any)[]> nghĩa là Promise which is resolved with a thenable array
      //Sau khi hover thấy vậy, thầy Udemy: "We assume we get a product list/array (đúng hơn nên thêm chữ Promise chỗ này) from findAll()"
          /// do đó .then(products=>  ) trong  Product.findAll().then(ham_success_listener_duoc_goi_va_nhan_tham_so_la_products)
          /// câu trên dịch theo ý mentor NguyenTuanAnh là: "Nếu thành công, Promise sẽ được resolve(productsArr) thì then(products), ngược lại reject() thì nó sẽ throw 1 lỗi ra và b sẽ phải catch(e) nó. Từ đây b có thể xử lý bàng cách gán mảng rỗng hay gì đó thì tùy vào tình huống nè."
      //bản thân hàm Promise.then(thenable_array_Promise) cũng trả về 1 Promise
      //.then().then().catch()
      //bản thân catch(nhận hàm rejecting callback) cũng trả về 1 no_value_resolved_Promise hay Promise<void>
      // so promises are chainable.
      .then(products => {
        res.render('admin/products', {
          prods: products, //our render function where we render the products
          pageTitle: 'Admin Products',
          path: '/admin/products'
        });
      })
      //chainable, nếu Promise tạo bởi then() có lỗi thì quăng lỗi
      .catch(err=>console.log(err));

};

exports.postDeleteProduct=(req,res,next)=>{
    //extract productId trong input hidden của form post 
    const prodId=req.body.productId ;
    console.log("prodId",prodId);
    Product.destroy({
      where:{
        id:prodId
      }
    })
    .then(result=>{
      console.log('deleted ID- row');
    })
    .catch(err=>console.log(err));
    //trả về Promise<number> nghĩa là Promise resolved with a number 
    // nghĩa là return Promise The number of destroyed rows
    res.redirect('/admin/products'); //the same khi updatedProduct.save();
}