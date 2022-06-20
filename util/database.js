/* Dùng sequelize phối hợp mysql2 */
//we will import sequelize and I'll store it in a sequelize constant
//you can name this constant however you want but I'll name it with a capital S cecause I actually import a constructor function or a class

//const Sequelize=require('sequelize'); sẽ không được hỗ trợ Intellisense 
const Sequelize = require('sequelize').Sequelize

//initialize the Sequelize with:
//database (coi chừng báo lỗi unknown database 'first-node-schema'), username, password, an optional object
    /// tham số thứ 4 là an object with options: it clear that we connect to a MySQL database because different SQL engines or databases use slightly different SQL syntax. Tìm tài liệu sequelize để xem kỹ
    ///by default host is localhost so we don't need to set it but I will explicitly set this to localhost.

//trong node_modules/Sequelize/sequelize.d.ts là file typescript có nhắc tới hàm tạo của class Sequelize
//constructor(database: string, username: string, password?: string, options?: Options);
const sequelize=new Sequelize('first_node_schema','root','Khangphongvu29@',{
   dialect:'mysql',
   host:'localhost'
});
//param 1: schema name là "first-node-schema"
   /// sequelize.schemaName = 'first-node-schema';  được dùng không ??

module.exports=sequelize; //export the sequelize object