//dùng Sequelize , we'll write it from scratch
//import 2 things
//import Sequelize class or constructor function, do đó tui viết tên biến bắt đầu chữ hoa S
const Sequelize = require('sequelize');
// next thing I'll import is my database connection (pool) managed by sequelize (thực ra là import what I export from database.js) 
   /// tui viết tên biến bắt đầu từ s
   /// thực sự data connection 'biến sequelize' này còn more than a data connection pool, còn là fully configured sequelize environment equipped all features of Sequelize package
      /// vd có thể dùng biến sequelize này để định nghĩa "sequelize model Product", từ đó Product sẽ nhận được các hàm của thư viện sequelize để tương tác với Bảng CSDL. Và controller sẽ import model Product để yêu cầu nó thực thi các lệnh thao tác với CSDL (vd LÀM sao fetch tất cả SP trong bảng products?)
      /// trước kia 
const sequelize = require('../util/database');

//định nghĩa model Product 
   /// hàm define() sẽ defines a new model, representing a table in the DB
   /// tham số thứ nhất là Model name,  typically is a lowercase name and I'll name it product 
   /// The second argument defines the structure of our model to be automatically generated (hover hàm define sẽ thấy). An object, attributes represents columns in table
const Product=sequelize.define('SANPHAM',{
  //khi hover Product, thấy nó là class extends từ class Model
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

