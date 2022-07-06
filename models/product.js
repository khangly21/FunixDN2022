const mongoose=require('mongoose');

//import Schema construtor/class to help me create schema instances
const Schema=mongoose.Schema;

//instantiating a schema object by calling that constructor
//then define how your product should look like with an JS object,  define a schema with simple key value pairs
   ///don't just define which keys you have but also which type these keys will have and that's important 
//this is how you set up such a blueprint

//Why you need schema? to create the model ( nơi xác định dữ liệu trông như thế nào ) for our API.
const productSchema = new Schema({
    title: {
        type:String,   //vế phải là String constructor
        required:true
    },
    price:{
        type:Number,   //vế phải là Number constructor
        required:true
    },
    description: {
        type:String, 
        required:true
    },
    imageUrl:{
        type:String, 
        //required:true thì tình trạng là trên MongoDB có các SP không có URL. Nếu thực hiện Model.save() vào trúng đó thì editPostProduct không có imageUrl
    },
    //cách thông thường là  userId:req.user.userId
    //nhưng chỉ cần dùng ObjectId và ref 'User' thôi là MongoDB tự động ghi nhận ObjectId thôi mà bỏ qua các thông tin khác của User. Muốn lấy luôn các thông tin khác thì dùng find().populate()
    userId:{
        type:Schema.Types.ObjectId,  //not obvious, this could be any ObjectId of any model.  I will add ref:'User' here and you use the name of your model to which you want to relate userId to
        ref:'User', //chú ý: không có import User Model
        required:true
    }
});

//give model a name "Sanpham" with a capital starting character  simply just the name of the entity, tham số thứ 2 là schema tương ứng

//compile Schema "productSchema" to a Model called "Sanpham" được trả về từ hàm mongoose.model()
//use the resulting model to initialize documents of the Model.  var book1 = new Book({ name: 'Introduction to Mongoose', price: 10, quantity: 25 });
//thì thư viện mongoose sẽ map JS object trên thành document  
//https://www.tutorialkart.com/nodejs/mongoose/define-a-model/

module.exports=mongoose.model("Sanpham",productSchema);  //https://mongoosejs.com/docs/models.html  (Định nghĩa model và 2 chức năng cơ bản của nó)
//When you call mongoose.model() on a schema, Mongoose compiles a model for you. When you insert schema to model(), schema is compiled 

//export khuôn Document là Model có tên là 'Sanpham', từ đó tên của collection là "sanphams"
//mongoose là thư viện hàm giúp ánh xạ Object-Document Mapping Library
//mongoose giúp tạo Object từ "khuôn/blueprint (ở đây không đề cập khái niệm class)" mongoose.model("Sanpham",productSchema) which is bound to mongoose.schema 's constraints
//Object này sau đó kế thừa các hàm từ thư viện mongoose để xử lý lưu trữ dữ liệu lên MongDb


//I export because this model is what we'll work with in our code.
//we can now move over to the admin controller where we have postAddProduct, nên nhớ model là Programming Interface to Database nên model có thể lọc dữ liệu nào được phép vào database nhờ vô ràng buộc Schema! 


// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       // Update the product
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this }); //updateOne with a Promise  ==> lưu vào dbOp
//     } else {
//       dbOp = db.collection('products').insertOne(this); //insertOne with a Promise  ==> lưu vào dbOp
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(result => {
//         console.log('Deleted');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;


