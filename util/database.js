/* Dùng sequelize phối hợp mysql2 */
//we will import sequelize and I'll store it in a sequelize constant
//you can name this constant however you want but I'll name it with a capital S cecause I actually import a constructor function or a class

//const Sequelize=require('sequelize'); sẽ không được hỗ trợ Intellisense 
//const Sequelize = require('sequelize').Sequelize //không ảnh hưởng lỗi TypeError: req.user.createProduct is not a function
const Sequelize = require('sequelize');

const sequelize=new Sequelize('first_node_schema','root','Khangphongvu29@',{
   dialect:'mysql',
   host:'localhost'
});
module.exports=sequelize; //export the sequelize object