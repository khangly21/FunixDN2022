//CƠ SỞ DỮ LIỆU NOSQL ĐÁM MÂY MONGODB ATLAS

//set up some code that will connect us to mongodb Cloud.
const mongodb=require('mongodb');
//we can extract a MongoClient constructor or class (viết hoa chữ cái M và C) by simply accessing mongodb, còn tên biến thì đặt theo ý bạn
const MongoClient = mongodb.MongoClient;

//use that client to connect to our mongodb database
   ///this is all we need to do to create a connection to mongodb.
   /// lấy url là connection string trên Atlas MongoDB cloud

//we got all set update that we need to establish such a connection.
//the connect method here actually returns a promise, which either fails or throws an error if the connection fails
//important thing, you need to make sure you are using the right user
   /// my case he is lyvietkhang_admin

//connection code , which uses Atlas connection string, is wrapped in an arrow function


const mongoConnect=(callback)=>{ //Vì JS function là object nên function được là tham số của hàm
    MongoClient.connect('mongodb+srv://lyvietkhang_admin:FLC0EfhTqJHonvsI@khangserver0.w0azxjp.mongodb.net/?retryWrites=true&w=majority')
    .then(
         //had a successful connection, nghĩa là if(connection)
         //basically a client object which gives us access to the database , or a successful connection object
         client=>{
             console.log("CONNECTED!!!");
             //Ý nghĩa:we have a file which when we execute, it would connect to mongodb. So  of course you want to execute this together with app.js (npm start)
             callback(client); ////hàm callback sẽ được gọi thực thi sau khi kết nối thành công
         }
    )
    .catch(
        //if(!connection) //MongoClient tui không tìm thấy connection nào
        // output my error here so that we can diagnose it
        err=>console.log(err)     
    )
}

module.exports =mongoConnect;