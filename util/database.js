//CƠ SỞ DỮ LIỆU NOSQL ĐÁM MÂY MONGODB ATLAS

const mongodb=require('mongodb');
const MongoClient = mongodb.MongoClient;
//2 dòng trên có thể viết gộp lại thành const MongoClient=require('mongodb').MongoClient;

//underscore _db is only here to signal that this will only be used internally in this file
let _db; //initially this will be undefined (variable)

//we can connect to mongoDB from inside Node
let mongoConnect=(callback)=>{ //CHÚ Ý : app.js không có hàm callback
    MongoClient.connect('') //trước dấu ? của connection string đáng lẽ có tên của CSDL, vd "test" database. Do đó I add "shop", if that database doesn't exist yet, mongodb will create it as soon as we start writing data to it
    //trả về a Promise nếu resolve() thì trả về MongoClient_instance là "client database"  ,giống như "browser" cài vào máy tính vì máy tính không thể giao tiếp máy chủ, nếu reject() thì trả về error() 
    //We could close the connection with db.close() and wait for the next database connection request
    .then(
        db=>{ //MongoClient instance is basically a `client object` which gives us access to the cloud  Mongo database server
             console.log("CONNECTED!!!");
             //I will store access/connection,  which we automatically connect just before npm start , to the "shop" database in the _db variable

             //db() là hàm create a new instance SHARING the CURRENT socket connections. Ý tưởng của người trong thực tế là gì?
             _db=db.db(); //yêu cầu Cloud MongoDB tạo connection pool từ the existing connection cho simul database requests 
             callback(); //hàm callback sẽ được gọi thực thi sau khi kết nối thành công
         }
    ) // cách tiếp cận: 1 connection only, 1 client object only --> for multiple (simul) Cloud MongoDB connection requests
    .catch(err=>{
            //I'll add a throw error here so that I also throw the error AGAIN when we fail here
            console.log(err);
            throw err;
        } 
    )
}

const getDb=()=>{
    //if db is set (trong PHP có hàm isset), so if it's (anything) not undefined if(_db)
    // access to that connected database MongoDB if it exists
    if(_db){
        return _db; //return access/connection to my database

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
