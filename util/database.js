const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;


let mongoConnect=(callback)=>{ 
  
    MongoClient.connect('mongodb+srv://lyvietkhang_admin:FLC0EfhTqJHonvsI@khangserver0.w0azxjp.mongodb.net/test?retryWrites=true&w=majority',{useUnifiedTopology:true}) 
  
    .then(
        MongoClient_instance=>{ 
             console.log("CONNECTED TO MONGODB!!!");
      
             _db=MongoClient_instance.db(); 
             callback(); 
         }
    ) 
    .catch(err=>{
          
            console.log(err);
            throw err;  
        } 
    )
}

const getDb=()=>{ 
    if(_db){
        return _db; 
    }
    throw "No database found!"; 
}

//I export 2 methods       
exports.mongoConnect=mongoConnect;
exports.getDb=getDb;

