const mongoose=require('mongoose');

//import Schema construtor to help me create schema instances
const Schema=mongoose.Schema;

//instantiating a schema object by calling that constructor
//then define how your product should look like with an JS object,  define a schema with simple key value pairs
   ///don't just define which keys you have but also which type these keys will have and that's important 
//this is how you set up such a blueprint

//Why you need schema? to create the model ( nơi xác định dữ liệu trông như thế nào ) for our API.
const productSchema = new Schema({
    //string is a default javascript object hence we can use as value
    //OK, schema for product obejct will have a title that is of type string
    //Nếu ghi  [ title:String ] là sẽ SyntaxError: unexpected ;
    
    /*
    //Cách 1:
    title:String
    */
  
    /*
    //Cách 2:
    //trong tài liệu https://dev.to/eetukudo_/understanding-mvc-pattern-in-nodejs-2bdn
    //không có new
    const articleSchema = Schema({

        title:{
            type: String,
            required: true,
        }

        //this is basically a more complex way of configuring the value for this key

    })
    */

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
    }
    //String and Number are 2 of schema types 

    //now we indeed give up some of the flexibility we had before and we force all objects to have a title but in the end in our application, every product needs to have a title indeed because we will run into other errors otherwise
        ///for example when outputting products in our views. (Vì product phải được cấu trúc rõ ràng để hiển thị)
        ///So having some kind of schema makes sense even though we have the flexibility to deviate from that
        ///When you need to struture your data, you need a tool: Mongoose 
           //// mongoose that takes some structure and then helps you work with that data.

    //Please note that I don't add _id here because this will still be added automatically as an ObjectId

});

//give model a name "Sanpham" with a capital starting character  simply just the name of the entity, tham số thứ 2 là schema tương ứng
module.exports=mongoose.model("Sanpham",productSchema);
//I export because this model is what we'll work with in our code.
//we can now move over to the admin controller where we have postAddProduct, nên nhớ model là Interface to Database


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


