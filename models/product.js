//const mongoConnect=require("../util/databse"); Không cần vì đã có kết nối tới MongoDB , vấn đề còn lại là kết nối tới CSDL tên gì
//using _db which is Db instance, ask it to connect to database
const getDb=require('../util/database'); //allows us to get access to the database connection (bằng cách yêu cầu _db kết nối CSDL tên gì??)
class Product{
    constructor(title,price,description,imageUrl){ 
        this.title=title; 
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        //với các this trỏ vào Product instance, Now we can create a new product (instance) in javascript. a new object which follows this form
    }
    
    //now to save it in the database, I will also add a save method here
    save(){
      //connected to mongodb server (database connection request at app initialization) and save my product
      //Nhược điểm: However if we would do this, we would have to connect to mongodb for every operation (tạo new Product instance) we do and we would not even disconnect thereafter (sau đó) bằng db.close()
      //Solution: So it would be better if we could manage ONLY ONE connection toward our database, and then simply return access to the `client object` which we set up ONCE to the different places in our app that need (Cloud Mongo access) access => tóm tắt : 1 connection only + 1 client object (MongoClient instance) only --> serve many (simul) database connection requests
          ///next lecture  Lab6.3
      //kích hoạt hàm getDb để receive the database instance (có dbName là "shop")
      const db=getDb();
      //now we have a "shop" database connection pool which allows us to interact with the database. Now we consider how to connect to  which collection in that database
      db.collection('products')
        .insertOne(this)
        .then(result=>{
          console.log(result)
        })
        .catch(err=> console.log(err)); 
      //biến this này không trỏ tới class Product (không có trong các class references), nên nó là đối tượng product 
      //here I'll connect to a products collection (not exist now).  Nhưng cả database và collection products chưa được tạo ra cho tới khi có dữ liệu đầu tiên điền vào collection
      //call collection to tell mongodb into which collection you want to insert something or with which collection you want to work
      //because remember in mongodb you have databases, collections and documents.
      //with the database, if it doesn't exist yet, it ,along with its collection ,  will be created the first time you insert data into collections.
      //w3school: In MongoDB, a database is not created until it gets content! Cụ thể, MongoDB waits until you have created a collection (table), with at least one document (record) before it actually creates the database (and collection).

      //on that collection, we can execute a couple of mongodb commands or operations.
      //Now a full list can be found in the official docs :https://www.mongodb.com/docs/  learn all about them and all the details in my full mongodb course which I mentioned.
          /// chọn View all products >> Mongo Server  >> Mongo CREUD operations >> https://www.mongodb.com/docs/manual/tutorial/insert-documents/
      //of course here's a short introduction too
      
      
              

    }
}

//Khi có const a=new Product(); thì Product trỏ vào cả class và constructor function. 

module.exports=Product; //I export the class with the save method



