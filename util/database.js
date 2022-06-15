/*

const mysql=require('mysql2');

//2 ways to connect to SQL database 
   /// W1 :set up one connection which we can then use to run queries, and we should always close the connection once we're done with a query
   /// W2 :  (better) create a so-called connection pool

//Theo cách 2, So to set up such a pool, I'll create a new constant pool, which is a pool of multiple connections sẵn sàng cho bất cứ query nào
// chứa javascript object with some information about our database engine, our database host we're connecting to

const pool=mysql.createPool({
    host:'localhost', //because it's running on our local machine 
    user:'root', //default username
    database:'first_node_schema',   //lấy tên của schema mới tạo trong MySQL Workbench
    //I also need to define the exact database name because this gives us access to a database server but that server typically has multiple databases
    password:'Khangphongvu29@'
})

module.exports=pool.promise();
//now we can always import from the database.js file to get access to that pool and to the connections

*/

/* Dùng sequelize phối hợp mysql2 */
//we will import sequelize and I'll store it in a sequelize constant
//you can name this constant however you want but I'll name it with a capital S cecause I actually import a constructor function or a class

//const Sequelize=require('sequelize'); sẽ không được hỗ trợ Intellisense 
const Sequelize = require('sequelize').Sequelize

//initialize the Sequelize with:
//database (coi chừng báo lỗi unknown database 'first-node-schema'), username, password, an optional object
    /// tham số thứ 4 là an object with options: it clear that we connect to a MySQL database because different SQL engines or databases use slightly different SQL syntax. Tìm tài liệu sequelize để xem kỹ
    ///by default host is localhost so we don't need to set it but I will explicitly set this to localhost.
const sequelize=new Sequelize('first_node_schema','root','Khangphongvu29@',{
   dialect:'mysql',
   host:'localhost'
});
//param 1: schema name là "first-node-schema"
   /// sequelize.schemaName = 'first-node-schema';  được dùng không ??

module.exports=sequelize; //export the sequelize object