/*
//không cần fs và path nữa, vì sẽ không dùng Model Product để giao tiếp với File
const db=require('../util/database'); //gives me access to my database pool, to my connection pool 
//import cart model 
const Cart=require('./cart');


module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // I will simply return the promise that execute 
    //that the fields you define here match the field names you defined in your table, in the database
       ////this only defines "where" do we want to insert something, the "what" is missing,
    // don't need to specify the ID because that should be generated automatically by the database engine.
    return  db.execute('INSERT INTO products (title,price,imageUrl,description) VALUES (?,?,?,?)', [this.title,this.price,this.imageUrl,this.description]);
    //Về vấn đề bảo mật, to safely insert values and not face the issue of SQL injection which is an attack pattern where users can insert special data into your input fields in your webpage that runs as SQL queries

  }

  static deleteById(id){
      
  }

  static fetchAll(cb) {
      //now reach out to the database
      //we need to get access to the database
      //to fetch all products 
      return db.execute('SELECT * FROM products');
      //After SELECT, execute returns a promise. I will return that promise object
      //tui đã có thể dùng .then().catch() , nhưng tui muốn trả về promise object ở nơi gọi fetchAll() 
      // VD ở controllers>>shop.js tại getIndex thì sau khi fetchAll() trả về promise object which sẽ được xử lý tiếp theo bởi .then().catch()
          //// Product.fetchAll().then().catch()
  }

  //Fetching a single product from MySQL database
  //tới Lab5.1_5.2_5.3 để test thử xem kết quả truy vấn database
  static findById(id) {
    //return the promise
    return db.execute('SELECT * FROM products WHERE products.id= ?',[id]);
    
  }
};
*/

//dùng Sequelize , we'll write it from scratch

//import 2 things
//import Sequelize class or constructor function, do đó tui viết tên biến bắt đầu chữ hoa S
const Sequelize = require('sequelize');
// next thing I'll import is my database connection (pool) managed by sequelize (thực ra là import what I export from database.js) 
   /// tui viết tên biến bắt đầu từ s
   /// thực sự data connection 'sequelize' này còn more than a data connection pool, còn là fully configured sequelize environment equipped all features of Sequelize package
      /// vd có thể dùng biến sequelize này để định nghĩa model Product
const sequelize = require('../util/database');

//định nghĩa model Product 
   /// hàm define() sẽ defines a new model, representing a table in the DB
   /// tham số thứ nhất là Model name,  typically is a lowercase name and I'll name it product 
   /// The second argument defines the structure of our model to be automatically generated (hover hàm define sẽ thấy). An object, attributes represents columns in table
const Product=sequelize.define('SANPHAM',{
    id:{
      type:Sequelize.INTEGER, //https://codewithhugo.com/sequelize-data-types-a-practical-guide/
      //integer trong sequelize hỗ trợ unsigned (không dấu) và zerofill (không nhận số 0)
      autoIncrement:true,
      //https://sequelize.org/ hay docs.sequelizejs.com
      allowNull:false,
      primaryKey:true//Primary key is important concept in SQL databases for retrieving the data
    },
    //define a javascript object to configure "title" in detail
    title:Sequelize.STRING,
    price:{
       type:Sequelize.DOUBLE,
       allowNull:false
    },
    imageUrl:{
      type:Sequelize.STRING, //giới hạn ký tự hơn so với TEXT là cả đoạn văn 
      allowNull:false
    },
    description:{
      type:Sequelize.STRING,
      allowNull:false
    }
})

//at least we need to export my Product model here
module.exports=Product; //this constant in which I define, store the defined model

