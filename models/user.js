//let's define a user model
//try to define a sequelize model with a user 

//first of all requiring the sequelize constructor or class
const Sequelize = require('sequelize').Sequelize;
//trong modern Javascript thì class cũng đồng nghĩa với Function (xem React component). Do đó const Sequelize = require('sequelize') // tác giả Udemy cố tình viết hoa S là để chỉ import Sequelize class or Sequelize constructor vào file
/*
   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof

    //define constructor
     function Car(make, model, year) {
          this.make = make;
          this.model = model;
          this.year = year;
     }
     const auto = new Car('Honda', 'Accord', 1998);
     
     console.log(auto instanceof Car);
     // expected output: true
     
     console.log(auto instanceof Object);
     // expected output: true

*/







const Sequelize2=require('sequelize');
//Ngoài sequelize trên,   dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */ the connection library for dialect should also be installed in your project
   ///you dont wanna import it, but sequelize takes care of it 
//import our own Sequelize instance which holds the connections
const sequelize = require('../util/database'); //biến này có kiểu dữ liệu Sequelize

//define a user and store user in const variable
//param 1 is name of model, param 2 is structure of user in an object 

// Mentor Ngô Tuấn Anh: const User=sequelize.define() tạo thực thể của class Sequelize.Model , nghĩa là đối tượng User sẽ thừa kế các hàm trong Sequelize.Model
   /// inherited from Model  /  inheritance
   ///  User là instance của Model chứ, nó là thực thể của Model. Nó có findAll() , hasMany(), etc

//define a model
//do sequelize được new() từ class Sequelize nên nó kế thừa inherit các hàm của class Sequelize
//xem node_modules / Sequelize / sequelize.d.ts

//define User model which is  a class
//https://sequelize.org/docs/v6/core-concepts/model-instances/
   // chính là tạo ra "class MyModel extends Model"
   //As you already know, a model is an ES6 class. An instance of the class represents one object from that model (which maps to one row of the table in the database)
const User=sequelize.define('user',{ 

    //second param . Each attribute of the hash / an object represents a column
    id:{
        type: Sequelize2.INTEGER,  //Sequelize.IntegerDataTypeConstructor
        autoIncrement:true,
        allowNull:false, 
        primaryKey:true
    },
    name:Sequelize2.STRING,  //hover Sequelize2 thấy nó tự import DataTypes, https://stackoverflow.com/questions/39187525/when-defining-a-model-should-i-use-sequelize-or-datatype
    email:Sequelize2.STRING
});

module.exports=User;
//Ater exporting, I can start using it 
// one thing I want to start using it for is that I want to create an association.
