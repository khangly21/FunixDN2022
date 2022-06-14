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