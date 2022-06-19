//import Product model
const Product = require('../models/product');
const User=require('../models/user'); 
//Tóm lại nhiệm vụ của Controller là gì?
   /// https://www.bezkoder.com/sequelize-associate-one-to-many/
   /*
       First, we setup Node.js App
       Next, configure MySQL database & Sequelize
       Define the Sequelize Model (class) and initialize Sequelize (model instances)
       Then we create the CONTROLLER for creating and retrieving Entities
       Finally we run the app to check the result
   */

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
  req.user.createSANPHAM({ 
      // creatSANPHAM() is not a function
      //không cần tạo userId là khóa ngoại manually cho bảng sanphams
      title:title,
      price:price,
      imageUrl:imageUrl,
      description:description
  })
  .then(SequelizeObject=>{ //SequelizeObject chính là "return Project.create()"
        console.log('new product created in database!');
        res.redirect('/admin/products')
  })
  .catch(err=>console.log(err));
  
  
  

  /* --------------------------------
  //code sau báo lỗi createProduct() --> https://sequelize.org/docs/v6/advanced-association-concepts/polymorphic-associations/
  const user = User.create({ name:'Khang',email:'test@test.com' });
  const product = user.createProduct({title:title,
    price:price,
    imageUrl:imageUrl,
    description:description});

  console.log(product.userId === user.id); // true
  */
}

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

  //https://sequelize.org/docs/v6/core-concepts/model-instances/
  //Sequelize là Promise-based libarary nên thường dùng Promise và await;  The await operator is used to wait for a Promise. It can (only) be used inside an async function within regular JavaScript code
     ///https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

  /*
  //Dòng sau sẽ báo lỗi TypeError: req.user.createProduct is not a function
  req.user.createProduct({
    //hàm này sẽ  automatically creates a connected model.
      title:title,
      price:price,
      imageUrl:imageUrl,
      description:description
  })//đi vào then() sẽ là "connected Model class Product"
  .then(result_is_Sequelize_object=>{ 
    //in case it does not go wrong.
    console.log("Sequelize object/Model instance nhận được sau khi postAddProduct: \n",result_is_Sequelize_object); 
    console.log('Created Product and this sequelize object can call save()'); //chờ tới khi Model instance được tạo hoàn tất thì dòng này mới hiện ra
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
*/



// /admin/edit-product/2?edit=true => GET
exports.getEditProduct = (req, res, next) => {
  //nhận dữ liệu của biến edit trên route 
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  //nhận giá trị biến productId của route
  const prodId = req.params.productId; //nhận param trên URL bởi GET request

  //Cách 1: Product.findByPk(prodId) sẽ thay cho SELECT trong sql
  //Cách 2: admin user thực hiện getSANPHAMs() nhờ Sequelize 
     
  req.user.getSANPHAMs({where:{id:prodId}})
    //where condition giúp filter
    //execute sql khi GET tới trang này bằng nhấn nút edit của SP id=2 là: SELECT * FROM SANPHAMs AS SANPHAM WHERE SANPHAM.userId=1 AND SANPHAM.id=2
        /// đặc biệt trong sql trên, user ID=1 đã được thêm vào bởi vì admin đã user.getSANPHAMs()   

      .then(products=>{
        console.log("products array nhận từ hàm getSANPHAMs: \n",products, Array.isArray(products)); //true
        //keep in mind here we get back an array even if it only holds one element (bởi 1 người có thể create nhiều sanpham), do đó we get "products". the one we are interested in will always be the first element
           //nếu người dùng viết lên URL id không có trong CSDL thì !product thì return thoát hàm trả về res.redirect(view '/'), còn product thì res.render(view admin/edit-product)
           const product=products[0]; //không cần nhắc tới dataValues , we have to store that separately in a new constant
           if(!product){
              //Express res. là kết thúc req-res cycle, return thoát hàm Promise gửi về đối tượng res hướng tới view '/'
               return res.redirect('/');
           }
           //Nếu có product thì Express gửi về đối tượng res hướng tới view 'admin/edit-product' với một đối tượng thông tin  
            res.render('admin/edit-product',{
              pageTitle:'Edit Product',
              path:'/admin/edit-product',
              editing:editMode,
              product:product   //gửi cả đối tượng javascript product cho view 'admin/edit-product', để hiển thị trong input cho người dùng thấy giá trị hiện tại của form
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
 
  //I'm fine with finding the product like this because if we are at this point, I assume we already have a product for this user only
  //It's fine to update the product like this!
  Product.findByPk(prodId) //LIMIT = 1 trả về 1 SP theo Primary key. Không thành vấn đề, I assume we already have a product (not productes) for this user only
         //hover product sau thấy nó có kiểu là Model, nên nó kế thừa các hàm của class Model của thư viện Sequelize là Product
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
  req.user
      .getSANPHAMs()
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

//Để ý hàm trong Javascript là 1 đối tượng
   /// mỗi action trong đây đều là là đối tượng riêng biệt, hoàn toàn có thể cho thành Entity để có thể ghi nhận vào phiếu (ngày, giờ thực hiện ...) hay cài vào CSDL