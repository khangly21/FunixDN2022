//const mongoConnect=require("../util/databse"); Không cần vì đã có kết nối tới MongoDB , vấn đề còn lại là kết nối tới CSDL tên gì
//using _db which is Db instance, ask it to connect to database
const getDb=require('../util/database').getDb; //allows us to get access to the database connection (bằng cách yêu cầu _db kết nối CSDL tên gì??)
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
      const db=getDb();
      
      //thiếu chữ "return" thì bên hành động postAddProduct product.save() trả về UNDEFINED result
      return db.collection('products')  
        .insertOne(this)
        .then(result=>{
          console.log("Kết quả từ insertOne() : \n",result) //có mảng chứa SP vừa thêm vào
        })
        .catch(err=> console.log(err)); 
    }
}

//Khi có const a=new Product(); thì Product trỏ vào cả class và constructor function. 

module.exports=Product; //I export the class with the save method



