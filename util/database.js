//KẾT NỐI NOSQL ĐÁM MÂY MONGODB ATLAS VÀ KẾT NỐI DATABASE tên xxxx trên MongoDB

const mongodb=require('mongodb');
const MongoClient = mongodb.MongoClient; //hover lên , class that allows for making Connection to MongoDB server
//2 dòng trên có thể viết gộp lại thành const MongoClient=require('mongodb').MongoClient;

//underscore _db is only here to signal that this will only be used internally in this file
let _db; //initially this will be undefined (variable)

//we can connect to mongoDB DBMS from inside Node , ONCE ONLY, and then connect to a specific database ONCE ONLY. Nhưng tên dbName trong db(dbName) là biến đổi
let x;
let mongoConnect=(callback)=>{ 
    //connect to MongoDB Cloud database server using MongoClient class, chưa nói tới databaseName là gì đó là việc của MongoClient instance gọi db(databaseName)
    MongoClient.connect('mongodb+srv://lyvietkhang_admin:FLC0EfhTqJHonvsI@khangserver0.w0azxjp.mongodb.net/?retryWrites=true&w=majority') //trước dấu ? của connection string đáng lẽ có tên của CSDL, vd "test" database. Do đó I add "shop", if that database doesn't exist yet, mongodb will create it as soon as we start writing data to it
    //trả về a Promise nếu resolve() thì trả về MongoClient_instance là "client database"  ,giống như "browser" cài vào máy tính vì máy tính không thể giao tiếp máy chủ, nếu reject() thì trả về error() 
    //We could close the connection with db.close() and wait for the next database connection request
    .then(
        MongoClient_instance=>{ //MongoClient instance is basically a `CLIENT OBJECT` (ý nói MongoClient_instance) which gives us access to the cloud  Mongo database server
             console.log("CONNECTED TO MONGODB!!!");
             //I will store access/connection,  which we automatically connect just before npm start , to the "shop" database in the _db variable

             //đã kết nối thành công tới MongoDB server, do đó db không liên quan tới việc kết nối tới MongoDB server
             //db(dbName) là hàm create a new Database instance SHARING the CURRENT socket connections. Ý tưởng của người trong thực tế là gì?
             _db=MongoClient_instance.db(); //yêu cầu CLIENT OBJECT tạo a new Db instance (dĩ nhiên có kiểu mongodb.Db) từ tên của database là "shop" trên connection string, new Db instance này shares the current socket connections
         
             //Behind the scene, MongoClient sẽ tạo connection pool TOWARDS database "shop" cho simul database requests. Bất cứ database request nào dùng connection pool sẽ được dùng chung luôn client object duy nhất ?? hay sau khi db.db() thì client object vẫn còn đó quản lý connection pool?
             callback("Hi there, Nodejs has been connected to MongoAB Atlas with your public IP address!!!"); //hàm callback sẽ được gọi thực thi sau khi kết nối thành công,đó chính là app.use(3000)
         }
    ) // cách tiếp cận: 1 connection only, 1 client object only --> for multiple (simul) Cloud MongoDB connection requests
    .catch(err=>{
            //I'll add a throw error here so that I also throw the error AGAIN when we fail here
            console.log(err);
            throw err;
        } 
    )
}

//Bất cứ nơi nào trong ứng dụng gọi hàm getDb thì sẽ sử dụng chung connection pool duy nhất và client object duy nhất
const getDb=()=>{ //Đã kết nối tới MongoDB từ lúc app khởi động, hàm getDb giúp nhận database instance
    //if db is set (trong PHP có hàm isset), so if it's (anything) not undefined if(_db)
    // access to that connected database MongoDB if it exists
    if(_db){
        return _db; //getDb does simply return that database instance (client from cloud database) we connected to with connection string (ý nói là db client cho phép Node kết nối rồi giao tiếp với cloud CSDL tên "shop" trên connection string). Chú ý db() không có dbName làm tham số thì mặc định lấy tên CSDL trên connection url string là "shop"

        //Cơ chế trên Cloud MongoDB đối với nhiều Express app, mỗi app yêu cầu MỘT database connection với provided connection string : mongodb behind the scenes will even manage this very elegantly with something called `CONNECTION POOL` where mongodb will make sure it provides sufficient connections for multiple simultaneous interactions TOWARDS the database! (VD a house _ many receiving doors _ many couriers _ 1 courier/ 1 door _ MongoClient_instance is the doorbell to connect _ me as database) => How to resolve this Promise from mongo?? 
        //Cơ chế trên Cloud MongoDB đối với MỘT Express app có nhiều get và post requests, mỗi ứng dụng đều chạy yêu cầu database connection tới cùng một database với 1 provided connection string
        //this is really a good pattern we should follow. With _db store connection, we still can connect (nếu có quá nhiều database connect requests từ nhiều app initialization khác nhau tới cùng một database )
    }
    //otherwise I'll essentially not do anything here, so I'll return undefined
    //We could also throw an err ;
    throw "No database found!";
}

//module.exports =mongoConnect;  Do not use this syntax because I don't just export mongoConnect
//I export 2 methods       
exports.mongoConnect=mongoConnect; //method for connecting 
exports.getDb=getDb; //storing the connection to the database,  therefore, db.db() will KEEP on running (Phải reuse the existing database connection)
                        ///mongodb behind the scenes will even manage this very elegantly with something called connection pooling where mongodb will make sure it provides sufficient connections for multiple simultaneous interactions with the database.