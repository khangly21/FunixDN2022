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

  static findById(id, cb) {
    
  }
};
