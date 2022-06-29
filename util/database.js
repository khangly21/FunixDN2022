const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

//Lưu access/reference của đối tượng javascript (cụ thể ở đây là hàm không tên) vào một biến tên "mongoConnect", biến này đóng vai trò là "mongodb connector" (mối nối tới mongodb) và sẽ được exports
let mongoConnect=(callback)=>{ 
    // MongoClient is constructor to build MongoClient instances 
    // URL có tên server và tên db là "test"
    MongoClient.connect('mongodb+srv://lyvietkhang_admin:FLC0EfhTqJHonvsI@khangserver0.w0azxjp.mongodb.net/test?retryWrites=true&w=majority',{useUnifiedTopology:true}) 
  
    .then(
        MongoClient_instance=>{ //MongoClient instance is basically a `CLIENT OBJECT` (ý nói MongoClient_instance) which gives us access to the cloud  Mongo database server
             console.log("CONNECTED TO MONGODB!!!");
      
             //Lưu đối tượng db tên "test" vào biến _db . Lúc này ta gọi biến _db là một access/reference tới db "test"
             //Tương tự ý tưởng của Sequelize, ở đây _db maps tới db "test" trên cloud atlas mongodb
             _db=MongoClient_instance.db(); //gọi class (bản chất của class là một hàm) mongodb.Db để create new database instace and store it to _db variable. Tui không lưu trữ class mà gọi class để tạo instance luôn.
             //Important note: sau khi lưu địa chỉ của "test" Db instance vào _bd, thì _db thành access/reference to "test" database
         
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
exports.mongoConnect=mongoConnect; //method for connecting to Mongo db "test". Tui không gọi hàm mà là lưu access/reference tới đối tượng hàm đó
exports.getDb=getDb;
//Vì sao mongoConnect sản xuất ra getDb nhưng phải export 2 hàm riêng biệt?
   /// Vì app.js sẽ cần mongoConnect chứ không cần getDb 
   
