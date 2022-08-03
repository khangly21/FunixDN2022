const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collectionCode = require('../security/itemCode');


const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

//https://mongoosejs.com/docs/models.html
    /// Models are fancy constructors compiled from MongooseSchema definitions. (Nói cách khác đã có idea hay schema definition rồi, thì Model là implementation của ý tưởng MongooseSchema đó)
    /// An instance of a model is called a document
    /// Models are responsible for creating and reading documents (chứa các magic Mongoose methods các hàm đọc-ghi lưu trữ dữ liệu) from the underlying MongoDB database.
    /// Model là lớp dịch vụ, được Lớp quản lý yêu cầu Model thực thi các task đọc-ghi dữ liệu !

//https://mongoosejs.com/docs/documents.html
    /// Document and Model are distinct classes in Mongoose. The Model class is a subclass of the Document class. When you use the Model constructor, you create a new document.
module.exports = mongoose.model(collectionCode, productSchema); //dùng Model để tạo 1 document mới
//Khi nào collection products xuất hiện? Khi postAddProduct lần đầu tiên cho 1 SP mới (chứ lang thang trên website mà không add SP mới thì collection không bao giờ xuất hiện).Do đó các models là thuộc sở hữu của admin và những người có quyền create sp

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
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
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
