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

    static fetchAll(){
        //of course need to get access to my database by calling 
        const db=getDb(); //không tham số thì mặc định dbName trên connection url string là "test"
        //I want to interact with my mongodb database to fetch all products
        // tell mongodb to which collection to connect to , and use a filter
        //for example we could find ALL products that have a title of a books:  return db.collection('products').find({title:'18'});
        //there are more elaborate filters than just equality filters available
        return db
            .collection('products')
            .find()
            .toArray()
            .then(products=>{
                //most importantly here, we should have our products and we can log our products here and then also let's return our products
                console.log(products);
                return products;
            })
            .catch(err=>console.log(err));
        //important thing about find() is find() does NOT IMMEDIATELY return a promise though, instead it returns a so-called CURSOR
        //why toArray ? method you can execute to tell mongodb to get all documents and turn them into a javascript array
        //should only use that if you know that we're talking about let's say a couple of dozens or maybe one hundred documents otherwise it's better to implement PAGINATION which is something we will implement at a later point of time in this course.



    } 
}

//Khi có const a=new Product(); thì Product trỏ vào cả class và constructor function. 

module.exports=Product; //I export the class with the save method



