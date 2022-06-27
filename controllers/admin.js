const Product = require('../models/product');

exports.getProducts=(req,res,next)=>{
  //simply use my product model and then use fetchAll which return a Promise and we can use then()  on it 
  Product.fetchAll()
     .then(products=>{
       //res.render nhắm tới 1 view trong thư mục views , và tham số đối tượng giúp configure that view
        res.render('admin/products',{
            prods:products,
            pageTitle:'Admin Product',
            path:'/admin/products'
        })
     })
     .catch(err=>console.log(err));
}


exports.getAddProduct = (req, res, next) => {
  console.log("Hi, i am getAddProduct!!!")
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
  //https://stackoverflow.com/questions/23751914/how-can-i-set-response-header-on-express-js-assets
  //https://stackoverflow.com/questions/45895958/set-custom-header-when-using-res-render
  //https://stackoverflow.com/questions/25564398/express-js-why-res-write-not-in-api-reference
  //https://stackoverflow.com/questions/44692048/what-is-the-difference-between-res-send-and-res-write-in-express
};

exports.postAddProduct = (req, res, next) => {
  // gán theo thứ tự constructor(title,price,description,imageUrl), nhưng hiện nay Product constructor đã thêm 5th argu là _id  (optional)
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description; 
  const imageUrl = req.body.imageUrl;
  //rõ ràng không có id nào được input hidden gửi tới trong req.body, do đó lúc save , Product constructor sẽ không nhận tham số _id, nên this._id IS UNDEFINED, dẫn tới database operation là insertOne(this)
  //ngược lại , postEditProduct thì prodId được gửi kèm trong req.body của POST req, khi save thì this._id tồn tại nghĩa là không null và không undefined , dẫn tới database operation là updateOne( {  } )

  //we'll pass all that data into the constructor of the product.
  //https://stackoverflow.com/questions/16474796/set-javascript-variable-null-or-leave-undefined
  const product=new Product(title,price,description,imageUrl,null,req.user._id); 
  //biến id sản phẩm null này có type object và lưu địa chỉ của đối tượng user nào đó, nếu null thì "we dont have that when creating a new product but for the user id, I want to pass the ID of the user which as you know we now store in our request",  // null nghĩa là biến userId hiện có empty value , đang chờ nhận value
  // còn req.user._id có kiểu ObjectId ? hay string ? Đáp án của thầy: string (vì which will be just a string here because when retrieving data, the object id is converted to a string for us,), nhưng typeof thì ra object :( 
  /*
     //trường hợp khác: Dùng null khi không phải chờ nhận value:
      if(jane.isManager == false){
          jane.employees = null;  //Generally, I use null for values that I know can have a "null" state

          //Otherwise, if its a variable or function that's not defined yet (and thus, is not "usable" at the moment) but is supposed to be setup later, I usually leave it undefined.
      }
  */

  /*
     // an empty string and null are very different things
     // cannot use ''; to declaring NULL variable in Javascript
  */

  /*
  
  */
  //phải đúng thứ tự đã định nghĩa: constructor(title,price,description,imageUrl). Nếu gán dữ liệu cho new Product(title,imageUrl,price,description); thì sẽ nhận được price="https://cdn.chess24.com/....." và render sai
  //hàm save không phải hàm static, nên muốn gọi nó phải thông qua instance
  product
      .save() //tạo dòng dữ liệu đầu tiên dẫn tới MongoDB tạo bảng và collection products vì phát hiện document đầu tiên
      .then(result_from_return=>{ 
            console.log(result_from_return); //undefined
            console.log('Created product!');
            res.redirect('/admin/products')
      })
      .catch(err=>console.log(err));
}   

exports.getEditProduct=(req,res,next)=>{
  //chú ý: sử dụng cả GET req.params và GET req.query
    const editMode=req.query.edit; //edit nhận giá trị true hay false hay undefined
    if(!editMode){
      //nếu gặp editMode có chân trị false  (khi editMode = false hay undefined editMode) thì vào if clause 
      return res.redirect('/');
    }
    const prodId=req.params.productId;  //productId là input name dành cho admin user trong view>>admin>>products.ejs
    //với POST req thì biến productId lúc nào cũng khác undefined chứa chuỗi input , còn lại thì cần xét nó là chuỗi rỗng hay không rỗng
    if(prodId === ""){
      console.log("Chuỗi prodId rỗng");
      res.redirect('/')
    }
    
    Product.findById(prodId)
    //we get back one product automatically because we wrote that method in such a way findById() returns a product, therefore can render this product,
           .then(product=>{ 
              //we get back one product here so no need to store it in a constant 
              if(!product){
                 //if product is falsy (undefined product or null product)
                 return res.redirect('/');
              }
              res.render('admin/edit-product',{
                  pageTitle:'Edit Product',
                  path:'/admin/edit-product',
                  editing:editMode,
                  product:product
              })
           })
           .catch(err=>console.log(err))
}

//coming soon --> next lecture!!!
exports.postEditProduct=(req, res, next)=>{
    //nhận <input type="hidden" value="<%= product.id %>" name="productId">
    const prodId=req.body.productId; 
    //update các form input từ admin/edit-product.ejs
    const updatedTitle=req.body.title; 
    const updatedPrice=req.body.price; 
    const updatedImageUrl=req.body.imageUrl; 
    const updatedDesc=req.body.description; 
    
    const product = new Product(
      updatedTitle,
      updatedPrice,
      updatedDesc,
      updatedImageUrl,
      prodId
    );
        
    product
      .save() //we just modified the save method to support both creation (postAddProduct) and updating (postEditProduct)
      .then(result=>{
          console.log('UPDATED PRODUCT!');
          res.redirect('/admin/products');
      })
      .catch(err=>console.error(err));
    
}

exports.postDeleteProduct=(req,res,next)=>{
    //extract the productId from POST req.body
    const prodId = req.body.productId; 
    /*
        we don't Product.findById(prodId) anymore, vì đã có cấu hình deleteOne() trong product.js model
    */
    Product.deleteById(prodId)
           .then(()=>{ //ERROR: TypeError: Cannot read properties of undefined (reading 'then')
             //Lý do là hàm deleteById(prodId) chưa return gì cho Promise hết
             console.log("REMOVED PRODUCT!");
             res.redirect('/admin/products');
           })
           .catch(err=>console.log(err));
}