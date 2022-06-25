//const mongoConnect=require("../util/databse"); Không cần vì đã có kết nối tới MongoDB , vấn đề còn lại là kết nối tới CSDL tên gì
//using _db which is Db instance, ask it to connect to database

const mongodb = require('mongodb');
const getDb=require('../util/database').getDb; //allows us to get access to the database connection (bằng cách yêu cầu _db kết nối CSDL tên gì??)

class Product{
    constructor(title,price,description,imageUrl,id){ 
        this.title=title; 
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        //id sẽ không dùng kiểu string như thường lệ của Post req
        this._id=new mongodb.ObjectId(id); //which is the better approach than Lab6.10
        //với các this trỏ vào Product instance, Now we can create a new product (instance) in javascript. a new object which follows this form
    }
    
    //now to save it in the database, I will also add a save method here, non-static method nên phải new một instance thì mới gọi được
    //save() chứa insertOne() hậu postAddProduct thôi chưa đủ, cần phải cập nhật sản phẩm hậu postEditProduct (cập nhật 1 hay nhiều fields)
    save(){
        const db=getDb(); //I always need access to the database 'test' (giống như kết nối Internet / access) in both cases _id is set or _id is not set 
        // db operations
        let dbOp; //undefined variable now, database operation có thể là insert hoặc update trong 2 nhánh này
        if(this._id){//this là instance gọi hàm save()
            //nếu _id is anything, except {null , undefined}
            // if _id had been set, update the product
            //I use update one and as the name suggests, update one will update exactly one element (element = a specific field) 
            //if you want,  update many elements at once with updateMany()
            //updateOne() takes at least two arguments.
                ///I'll pass a javascript object and we can filter for equality (:) also or run more complex QUERIES which you again can learn about in my mongodb course if you want
            dbOp=db.collection('products')
                   //****** Cách 1: since we want to replace all fields, we can just say {$set: this} here, updating the existing database object
                   .updateOne({_id:this._id}, {$set: this}); //Object hóa string id để SO SÁNH tìm ra document mong muốn, sau đó thực hiện SET operation cho nó với dữ liệu của this. Tuy nhiên có sai sót chỗ tham số thứ hai: this._id là string ghi đè lên giá trị cũ có kiểu dữ liệu mongodb.ObjectId. Sẽ sửa lại trong Lab6.11 
                   //******* Cách 2 (more verbose way) (không phù hợp với object có nhiều thuộc tính): updateOne({_id:new mongodb.ObjectId(this._id)}, {$set:{title:this.title, price:this.price, description:this.description  , imageUrl: this.imageUrl}  }); 
                   //I only want to find a document where the _id is equal to
                   //So I'm looking for a MongoDB document where the _id matches the this_id I have here in my product I'm currently working
                   //for THAT document, we now as a second argument : specify how to update that document , we have to describe the operation / describe the changes we want to make to the existing document which we found with this filter.
                   //Muốn describe thì phải using a special property name which is understood by mongodb
                       ///https://www.thecodebuzz.com/mongo-db-naming-conventions-standards-guidelines/
                   //Chú ý: db.collection('products').updateOne({_id:new mongodb.ObjectId(this._id)} , this ); có ý nghĩa:  we tell mongodb find me the existing document and replace it with this, tuy nhiên updateOne does not replace (theo quy tắc cũ giống như React)
        }else{ //ĐÂY CHÍNH LÀ postAddProduct (form thêm sản phẩm mới)
            // if _id is not set in database, insert the product (with your user-defined id hay mongo add automatically)
            // one case where dbOp is simply my insert command
            //by accessing the database "test", then accessing the collection "products", then insert the new document
            //chú ý: nếu dbName="admin" thì không cho insert vì admin (người dùng đầu tiên chỉ có quyền Read và Write), còn dbName="test" thì được insert
            dbOp=db.collection('products')
                   .insertOne(this);
        }
        //cả 2 nhánh trên đều dẫn tới return 1 Promise
        //thiếu chữ "return" thì bên hành động postAddProduct product.save() trả về UNDEFINED result
        return  dbOp
                .then(result=>{
                    console.log("Kết quả từ database operation (insertOne hoặc updateOne) : \n",result) //có mảng chứa SP vừa thêm vào
                })
                .catch(err=> console.log(err)); 
    }

    //now delete product from the MongoDB
    static deleteById(prodId){
        //of course again we need access to the central database
        const db=getDb();
        //on db, reach out to the products collection and on that collection, we want to delete an element.
        //gán ObjectId instance vào thuộc tính _id trong mongodb 
        //the object param to specify how to delete the document
        //=> now mongodb will go ahead and delete the FIRST element it finds that has this criteria fulfilled.
        return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)})
                                 .then(result=>{
                                     console.log('DELETED successfully')
                                 })
                                 .catch(err=>{
                                     console.log(err);
                                 })
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
                return products; // đây là dữ liệu được Promise (returns a promise so we can still use then on it)
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



