//CƠ SỞ DỮ LIỆU NOSQL ĐÁM MÂY MONGODB ATLAS

//set up some code that will connect us to mongodb Cloud.
const mongodb=require('mongodb');
//we can extract a MongoClient constructor or class (viết hoa chữ cái M và C) by simply accessing mongodb package module, còn tên biến thì đặt theo ý bạn
const MongoClient = mongodb.MongoClient;
//2 dòng trên có thể viết gộp lại thành const MongoClient=require('mongodb').MongoClient;
//hover class MongoClient sẽ thấy 2 cách tạo instance cho nó
    //Cách 1: gọi hàm tạo và class:  
        ///new MongoClient(url_string) sau đó instance.connect() với connect là non-static method 
    //Cách 2: sử dụng hàm static MongoClient.connect với MongoClient là class

//underscore _db is only here to signal that this will only be used internally in this file, but db is ok
let _db; //initially this will be undefined (variable)

//use that client to connect to our mongodb database
   ///this is all we need to do to create a connection to mongodb.
   /// lấy url là connection string trên Atlas MongoDB cloud

//we got all set update that we need to establish such a connection.
//the connect method here actually returns a promise, which either fails or throws an error if the connection fails
//important thing, you need to make sure you are using the right user
   /// my case he is lyvietkhang_admin

//connection code , which uses Atlas connection url string, is wrapped in an arrow function

//we can connect to mongoDB from inside Node
let mongoConnect=(callback)=>{ //Vì JS function là object nên function được là tham số của hàm

    //Kích hoạt hàm static MongoClient.connect
    // It will be created on the fly (tạo một cách nhanh chóng) when we first access it which is again fitting that flexibility theme mongodb gives us. In SQL we had to prepare everything in advance (như vậy thì mới viết lệnh SQL), at least when not using sequelize which also had to do that (Sequelize User.create() sẽ tạo bảng dựa trên modelName và tự tạo SQL for us) but it did it for us
    MongoClient.connect('') //trước dấu ? của connection string đáng lẽ có tên của CSDL, vd "test" database. Do đó I add "shop", if that database doesn't exist yet, mongodb will create it as soon as we start writing data to it
    //connect là hàm trả về Promise<mongo.MongoClient> có thể hiểu là đối tượng Promise resolves một đối tượng kiểu dữ liệu mongo.MongoClient, đó chính là connected_mongoclient instance
    .then(
         //inside then, "sự kiện onfulfilled" there is a callback to execute when the Promise is resolved 
         //had a successful connection, nghĩa là if(connection)
         //basically a client object which gives us access to the database , or a successful connection object

         
         connected_mongoclient_instance=>{ //CLIENT này có thể vào làm tham số của callback ?? yes, kích hoạt callback(connected_mongoclient_instance)
             //connected_mongoclient_instance có kiểu dữ liệu mongo.MongoClient
             console.log("CONNECTED!!!");
             //I will store access/connection to the database in the _db variable
             //give us access to the 'shop' database to which we automatically connect 

             //db() là hàm create a new instance sharing the current socket connections
             _db=connected_mongoclient_instance.db() //cho dù trong connection string có "shop?" thì db('test') nó sẽ overwrite  and connect to a different database than you were connected to initially on connection string, but I'll not enter anything and just connect to that database.
             //Ý nghĩa:we have a file which when we execute, it would connect to mongodb. So  of course you want to execute this together with app.js (npm start)
             callback(); ////hàm callback sẽ được gọi thực thi sau khi kết nối thành công
         }
    )
    .catch(
        //if(!connection) //MongoClient tui không tìm thấy connection nào
        // output my error here so that we can diagnose it
        err=>{
            //I'll add a throw error here so that I also throw the error AGAIN when we fail here
            console.log(err);
            throw err;
        } 
    )
}

const getDb=()=>{
    //if db is set, so if it's (anything) not undefined
    // access to that connected database MongoDB if it exists
    if(_db){
        return _db; //return access/connection to my database
        //Cơ chế: mongodb behind the scenes will even manage this very elegantly with something called connection pooling where mongodb will make sure it provides sufficient connections for multiple simultaneous interactions with the database!
        //this is really a good pattern we should follow. With _db store connection, we still can connect
    }
    //otherwise I'll essentially not do anything here, so I'll return undefined
    //We could also throw an err ;
    throw "No database found!";
}

//module.exports =mongoConnect;  Do not use this syntax because I don't just export mongoConnect
//I export 2 methods       
exports.mongoConnect=mongoConnect; //method for connecting 
exports.getDb=getDb; //storing the connection to the database,  therefore, connected_mongoclient_instance.db() will keep on running 
