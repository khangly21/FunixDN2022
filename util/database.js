const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;//MongoClient ,It Is A NodeJs Module That Lets You Manipulate,Create,Connect To A Mongo Database., in your example is just a Nodejs library that handles connecting to and interacting with a MongoDB database.

/*
    //This is A Better Way To Write It (ES6 Version)
    const {MongoClient} = require('mongodb');
*/

let _db;

//access tới arrow function giúp kết nối MongoDb được lưu trong biến mongoConnect sau đó xuất khẩu biến này, nơi nào import sẽ kích hoạt bằng cách mongoConnect()
const mongoConnect = callback => {
  //use connect() to connect to MongoDB server using an url containing db name. This is an async function/operation, trả về a Promise object cho biết kết quả thành công hay từ chối của async connection operation cùng với resulting value của this operation 
  MongoClient.connect(
    'mongodb+srv://lyvietkhang_admin:FLC0EfhTqJHonvsI@khangserver0.w0azxjp.mongodb.net/test?retryWrites=true&w=majority',{useUnifiedTopology:true}
  )
  //then(callback_to_be_executed_when_Promise_is_resolved)
    .then( (client) => {  
      console.log('Connected successfully to database!');

      //"connected MongoClient" sẽ tạo ra database client (object/access/reference) có cùng socket connection với "connected MongoClient" 
         ///vì vậy mà access có có thể kích hoạt các hàm của db như db.collection("products")
      //tới lượt database client sẽ tạo /trả về reference/collection client tới online MongoDB collection. Nếu chưa tồn tại trên MongoDB online thì ngầm tạo ra 

      //db = client.db(MONGO_DATABASE_NAME);
      // nếu hàm này có bộ tham số (err,client) thì TypeError: cannot read property of undefined (reading db)
         /// không cần tham số err, nếu connect không được sẽ catch err và báo Topology is closed,please connect
      _db = client.db();  //hàm db chứa code để create a new db instance với dbName mặc định là trên connection string, là "test", và instance này sẽ gọi hàm trên nó
      
      
      //Khởi động server listening on one specific port
      callback(client);
    })
  //catch attaches callback for only the rejection of the Promise
    .catch(err => {
      console.log("CÓ VẤN ĐỀ TRONG MONGODB CONNECTION",err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
