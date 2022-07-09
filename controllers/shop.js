//Controller gets access/reference to Model Sanpham để có thể gọi các hàm xử lý dữ liệu static  hay  nonstatic
const Product = require('../models/product');
//import Order Model để tạo order instance kế thừa các instance methods (dịch vụ) của thư viện Mongoose
const Order= require('../models/order');

exports.getProducts = (req, res, next) => {
  //Controller không cần yêu cầu Model tạo instance để gọi find() vì find() là static method, nên dùng Model để gọi trực tiếp
  Product.find()//mongoose find() trả về cho Controller các products. Tui có thể get access to cursor Product.find().cursor().next() which gets the next element hay Product.find().cursor().eachAsync() which would allow us to loop through them
  //I will just use mongoose's find and this will essentially give me all my `products` automatically.
  //một thời gian sau, Model sẽ return cho Controller 'products'
  .then(products=>{
    console.log(products); //mảng
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => {
    console.log(err);
  });


  // Product.fetchAll()
  //   .then(products => {
  //     res.render('shop/product-list', {
  //       prods: products,
  //       pageTitle: 'All Products',
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};

exports.getProduct = (req, res, next) => {
  //extract prodId từ GET req
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));

  //good thing is Sanpham is Mongoose model and mongoose indeed has a findById() which is static method,
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    
    //string path:'cart.items.productId' đây là path chứa ref:'Sanpham' 
    //The 'ref' option is what tells Mongoose which model to use during population
    .populate('cart.items.productId')  //không trả về Promise
    //.execPopulate() //giúp trả ra Promise thì dùng then  // hàm exePopulate() không còn là function từ mongoose 6 trở đi
    /*
        Lưu ý: từ Mongoose 6 trở đi, phương thức populate trả về một promise và không thể nối thành chuỗi được nữa. Bạn cần sửa code như sau:
        Thay thế:
        await doc.populate('path1').populate('path2').execPopulate();
        bằng
        await doc.populate(['path1', 'path2']);
        
        Thay thế:
        await doc.populate('path1', 'select1').populate('path2', 'select2').execPopulate();
        bằng
        await doc.populate([{path: 'path1', select: 'select1'}, {path: 'path2', select: 'select2'}]);
    
    */
    .then(user => {
      console.log(user.cart.items);
      const products=user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  console.log("req.body sau khi postCart: \n",req.body);
  const prodId = req.body.productId; //lấy về từ MongoDB nơi tạo _id tự động cho bất cứ sản phẩm nào được postAddProduct
  console.log("postCart product Id: ",prodId) //62c290b85a21d4b9a8661e75 . Do Javascript xem đây là 3/4 string nên mới console.log được / Muốn so sánh với 100% string thì dùng .toString()
  Product.findById(prodId)
    .then(product => {
      console.log("product found by Id: \n",product); // _id: new ObjectId('62c290b85a21d4b9a8661e75') vì product là Mongoose object
      //yêu cầu User model req.user thực hiện hành động addToCart
      return req.user.addToCart(product); //product._id: new ObjectId('62c290b85a21d4b9a8661e75') do đó khi so sánh trong addToCart phải .toString()
    })
    .then(result => {
      //https://www.w3docs.com/snippets/javascript/how-to-convert-object-to-string.html
      //https://www.w3docs.com/snippets/javascript/how-to-convert-object-to-string.html
      //However, this doesn't work if the object has function property.
      console.log("result của addToCart là object nên sẽ có biểu diễn object trong log. Khi console.log có một [Object] cho biết console.log không ủng hộ Object bằng string: \n",result); //result chính là User instance với cart đã được cập nhật (VD từ cart rỗng thành cart có sp)
      console.log("result của addToCart với JSON.stringify() nên sẽ có biểu diễn chuỗi json (aka json-encoded string) trong log: \n",JSON.stringify(result));
      console.log("result của addToCart với toString() nên sẽ có biểu diễn string trong log : \n",result.toString() );
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  //trạng thái hiện tại, current "logging" user doc object chưa có order nào
  req.user
    //trong collection testMongoose thì users có productId là reference, khi gặp populate() thì productId thành full object
    .populate('cart.items.productId') //không để dạng reference productId, mà là embed fully-populated product
    .then(user => {
      console.log("điều khiển hành động postOrder, \n",user.cart.items);

      //now get the populated products that are in the users cart.
      const products=user.cart.items.map(i=>{
        //tên các keys như quantity và productData phải có trong order.js
        return {quantity:i.quantity,productData:i.productId} //sau khi populate thì i.productId chính là fully-populated product
      });

      const order=new Order({
        //cấu trúc bên trong giống như cart chuyển qua, đã được xác định trong Schema + xem Kết quả cần đạt
        //nghĩa là cần mảng products , đối tượng user  
        // we need to add the array of {product+quantity} for these users cart
 
        //remember, request user is a fully-populated user object fetched from the database
         users:{
           name:req.user.name,
           //we can just use the entire req.user object and as I mentioned mongoose will automatically pick the ID from there.
           userId:req.user
         },
         products:products 
      });

      //need to call save on that order, so saves (the first time sau khi click Order now?) that order to the database.
      return order.save();
      //ngoài cart, theo User schema thì user cũng  cần thông tin về order
      //trước kia MongoDB without Mongoose đã gọi dịch vụ tự định nghĩa req.user.addOrder không phải để thêm thuộc tính order cho User, mà là thêm order doc object cho Order collection. Với Mongoose thì đã hoàn tất với order.save();
      //do Order now hết cartitems, nên sau khi vào CSDL, phải xóa info liên quan
    })
    //nhớ result là Promise trả về từ "RETURN order.save()"
    .then(result => {
        //execute adding order to orders collection successfully, done created first order document then created "orders" collection then 
        //cập nhật locally req.user.cart.items về [] sau đó cập nhật Mongodb user.cart.items thành []  
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  
  req.user
    .getOrders()
    //Javascript array is sent back
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
