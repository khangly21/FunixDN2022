const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

//access tới arrow function giúp kết nối MongoDb được lưu trong biến mongoConnect sau đó xuất khẩu biến này, nơi nào import sẽ kích hoạt bằng cách mongoConnect()
const mongoConnect = callback => {
  //use connect() to connect to MongoDB server using an url containing db name. This is an async function/operation, trả về a Promise object cho biết kết quả thành công hay từ chối của async connection operation cùng với resulting value của this operation 
  MongoClient.connect(
    'mongodb+srv://lyvietkhang_admin:FLC0EfhTqJHonvsI@khangserver0.w0azxjp.mongodb.net/test?retryWrites=true&w=majority',{useUnifiedTopology:true}
  )
  //then(callback_to_be_executed_when_Promise_is_resolved)
    .then(client => {
      console.log('Connected successfully to database!');
      //db = client.db(MONGO_DATABASE_NAME);
      _db = client.db();  //hàm db chứa code để create a new db instance với dbName mặc định là trên connection string, là "test", và instance này sẽ gọi hàm trên nó
      callback();
    })
  //catch attaches callback for only the rejection of the Promise
    .catch(err => {
      console.log(err);
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
