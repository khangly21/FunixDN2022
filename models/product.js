//const mongoConnect=require("../util/databse"); Không cần vì đã có kết nối tới MongoDB , vấn đề còn lại là kết nối tới CSDL tên gì
//using _db which is Db instance, ask it to connect to database

const mongodb = require('mongodb');
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
        .insertOne(this) //chú ý: nếu dbName="admin" thì không cho insert vì admin (người dùng đầu tiên chỉ có quyền Read và Write), còn dbName="test" thì được insert
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
                console.log("Mảng products thu được là: \n",products);
                return products;
            })
            .catch(err=>console.log(err));
        //important thing about find() is find() does NOT IMMEDIATELY return a promise though, instead it returns a so-called CURSOR
        //why toArray ? method you can execute to tell mongodb to get all documents and turn them into a javascript array
        //should only use that if you know that we're talking about let's say a couple of dozens or maybe one hundred documents otherwise it's better to implement PAGINATION which is something we will implement at a later point of time in this course.
    } 

    static findById(prodId){ //prodId is a string
        //Với Promise thì I either have an error or I get my product and I try to render the product detail page.

        //access to "test" database
        const db=getDb();
       
        //thực hiện find_only_one product bên trong collection 
        //do đó trước tiên phải access to 'product' collection trước 
        // I'll narrow down the result set with find and then 
        //I'll pass a javascript object to it which allows me to configure a filter and here, I want to look for a product where _id is equal to prod ID because that's the ID of the product I'm looking for.
        //with this, I'm returning theoretically all products which have this ID but I know it'll only be one??
        // actually find will still give me a CURSOR (con trỏ) because mongodb doesn't know that I will only get one
        //next() step by step until the last document that was returned by find({_id:prodId})
      

        return db
          .collection('products') //nếu "product" là kết nối tới undefined db
          .find({_id:new mongodb.ObjectId(prodId)}) //MongoDB tự tạo ID  với ký hiện _id có kiểu Object, chứ không phải id kiểu string. Dấu _ có nghĩa là internally used. Giai pháp _id:new mongodb.ObjectId(prodId)
          //when I compare here, prodId của nhập form tất nhiên là string, nên không thể so sánh bằng với Id object , vì Mongo không so sánh bằng id string vói id object.
          // Solution: chuyển id string thành id Oject lúc đó so trùng được và prodId và các Id objects trong CSDL
          .next()
          .then(product=>{// biến product có thể undefined (có thể do undefined dbName hay undefined _id) hoặc null (do không trỏ tới giá trị nào hết)
              if(product){ //nếu undefine product hay null product thì false
                  console.log("product tìm ra từ collection products có _id = prodId",product); // nếu product null thì ở view 'shop/product-detail' báo lỗi: cannot read properties of null (reading 'title')
                  return product; 
              }
              //else: product is anything but (undefined or null)
          })
          .catch(err=>{
             console.log(err);
             //throw "product === null"; sai, cho dù product null hay undefined thì cũng không xuống đây
          })
    }
}

//Khi có const a=new Product(); thì Product trỏ vào cả class và constructor function. 

module.exports=Product; //I export the class with the save method



