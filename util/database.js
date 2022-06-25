const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

let mongoConnect=(callback)=>{ 
    // MongoClient is constructor to build MongoClient instances 
    MongoClient.connect('',{useUnifiedTopology:true}) 
  
    .then(
        MongoClient_instance=>{ //MongoClient instance is basically a `CLIENT OBJECT` (ý nói MongoClient_instance) which gives us access to the cloud  Mongo database server
             console.log("CONNECTED TO MONGODB!!!");
      
             _db=MongoClient_instance.db(); 
         
             //Behind the scene, MongoClient sẽ tạo connection pool TOWARDS database "shop" cho simul database requests. Bất cứ database request nào dùng connection pool sẽ được dùng chung luôn client object duy nhất ?? hay sau khi db.db() thì client object vẫn còn đó quản lý connection pool?
             callback(); //hàm callback sẽ được gọi thực thi sau khi kết nối thành công,đó chính là app.use(3000)
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
const getDb=()=>{ 
    if(_db){
        return _db; 
    }
    throw "No database found!"; //sẽ gặp nếu const mongoConnect = require('./util/database').getDb;
}

//I export 2 methods       
exports.mongoConnect=mongoConnect; //method for connecting 
exports.getDb=getDb;
