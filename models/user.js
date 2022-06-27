const mongodb=require('mongodb');
const getDb=require('../util/database').getDb; //biến getDb lưu hàm user-defined và có thể gọi chạy hàm bằng getDb() 
//Nếu 1 biến r lưu hàm class thì r() sẽ chạy constructor của class đó

//simply store access to it by accessing it up here but I'm not calling this constructor, I'm not creating an object
//I'm just storing the reference (the access) to the ObjectId class in my ObjectId constant (const nghĩa là không thể gán địa chỉ khác được nữa)

const ObjectId=mongodb.ObjectId; 

/*
    // ghi chú từ Lab6.1
    let obj = new Animal(8,8,8); //gọi hàm class, vì bản chất class là 1 hàm, thường gọi là utility function dùng trong applications
    obj.speak(); //ok
    let speak = obj.speak; //gán function obj.speak vào biến
    speak(); //undefined

    //static function  
    Animal.eat() // [class Animal], utility function hay gặp
    let eat = Animal.eat; //gán function Animal.eat vào 1 biến 
    eat(); // undefined

    //vậy biến lưu access/reference tới class / constructor thì sao??
        console.log("z:");
        let z=Animal;  //z là access/reference to class Animal
        let e= new z(); //không có tham số
        e.speak();

        //trả về Animal {height: undefined, weigth:undefined, width: undefined}
*/

class User{
  //thông tin của new users:
  constructor(username,email){
      //lưu các dữ liệu của User instance được nhắc tới là 'this' javascript object
      this.name=username;
      this.email=email;
  }

  //save User instance to MongoDB
  save(){
    //store database client into a const
    const db=getDb();
     //mongodb sẽ không tạo ra database và collection cho tới khi có dòng dữ liệu đầu tiên

     //return this chain and let whoever calls this listen to that if there is need for that
     db.collection('users').insertOne(this); 
     //insert one new element will be "this"
     //this javascript object we're in, so an object with a name and an email property, this is what I want to store as a user for now.
  }
  
  static findById(userId){
    //still get access to my database client
    //access collection "users" and find a specific user
    const db=getDb(); 
    //https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
      ///the cursor method next() to access the first document (cũng là doc duy nhất sau khi lọc collection)
    //Cách 1:
    return db.collection('users')
             .findOne({_id:new ObjectId(userId)}); //should find me all fitting users and I therefore get back a cursor, do đó phải gọi next() để bước tiếp step by step to get the FIRST (ý nói collection đã lọc users có nhiều user object, thì lấy người đầu tiên cho dù mảng đó chỉ có 1 phần tử)
         
    //Cách 2: return db.collection('users')..find({_id:new ObjectId(userId)}).next(); 
    //to get my document hoặc nếu không có thì null document, var myDocument = myCursor.hasNext() ? myCursor.next() : null;
    //call next to get the first and as we know only element that matters to us
    //ban đầu tui dùng .find(), nhưng to be sure, use findOne()
  }

}




module.exports = User;
