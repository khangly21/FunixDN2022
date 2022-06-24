//const mongoConnect=require("../util/databse"); Không cần vì đã có connection pool khi app khởi động 
//I don't just can connect the connection now but I can import get db and that of course is very useful
const getDb=require('../util/database'); //means that I now can call this function to get access to my database and therefore I can use it to well interact with the database.
class Product{
    constructor(title,price,description,imageUrl){ 
        this.title=title; 
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        //với các this trỏ vào Product instance, Now we can create a new product (instance) in javascript. a new object which follows this form
    }
    
    //now to save it in the database, I will also add a save method here
    // save(
    //   //connect to mongodb (database connection request) and save my product, to be able to connect, I'll need to import mongoConnect
    //   //Nhược điểm: However if we would do this, we would have to connect to mongodb for every operation (tạo new Product instance) we do and we would not even disconnect thereafter (sau đó) bằng db.close()
    //   //Solution: So it would be better if we could manage ONLY ONE connection toward our database, and then simply return access to the `client object` which we set up ONCE to the different places in our app that need (Cloud Mongo access) access => tóm tắt : 1 connection only + 1 client object (MongoClient instance) only --> serve many (simul) database connection requests
    //       ///next lecture  Lab6.3

    // )
}

module.exports=Product; //Product này là class, chứ không phải constructor , Do đó tên gọi của nó viết hoa chữ cái đầu tiên, các module khác được thì người dạy gọi là "import class or constructor" , có thể vì code khác
//Kết luận: class và constructor đầu là hàm, khác ở chỗ class được export và import. Còn constructor là nơi lưu data của instance, các method của class được bind(instance) nên trong method có thể gọi this. Các instance mới sẽ kế thừa class các nonstatic members (nonstatic datas and nonstatic methods) nên tự nó có thể gọi thực hiện các non-static method, còn các static method chỉ có thể được gọi bởi class
//class được dùng để gọi static method



