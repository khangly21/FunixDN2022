const mongodb=require('mongodb');
const getDb=require('../util/database').getDb;


const ObjectId=mongodb.ObjectId; 

class User{
  //thông tin của new users:
  constructor(username,email,cart,id){ //optional id được thêm vào để find user by id on Cloud MongoDB
      //lưu các dữ liệu của User instance được nhắc tới là 'this' javascript object
      this.name=username;
      this.email=email;
      // we can assume that we'll have a cart property on our user
      // we can also store the cart (instance 's data) in our javascript object here  which will be based on the data stored in the database.
      this.cart=cart;// vế phải là instance {items:[] }
      this._id=id; //string id
  }

  sayHi(){
    console.log('H E L L O W O R L D !')
  }

  //save User instance to MongoDB, nếu trùng dữ liệu thì có lưu không?
  save(){
    //store database client into a const
    const db=getDb();
     //mongodb sẽ không tạo ra database và collection cho tới khi có dòng dữ liệu đầu tiên

     //return this insertOperation and let whoever calls this listen to that if there is need for that
     return db.collection('users').insertOne(this); 
     //insert one new element will be "this"
     //this javascript object we're in, so an object with a name and an email property, this is what I want to store as a user for now.
  }

  addToCart(product){
      //I can have all the logic I need to find out if that product is already inside of the cart and therefore if I just want to increase the quantity or if it is not and therefore I want to postAddProduct it for the first time.
      //this is non-static method, so  must not forget that add to cart will be called on a user object
      //we'll create that object with data we fetched from the database with the help of this.findByID, will return a user.
      //giả sử user có thuộc tính cart , then now we just need to find out if that cart contains a certain product already. How? we could create a new constant, cart product and then use this cart items and find, let's say the index of a product in that cart with the same ID as the product we're trying to add again
      //dùng hàm findIndex() trên mảng, return the index of the first element in array where the predicate is true, return -1 otherwise
      //findIndex() which simply is a function javascript will execute for every element in the items array
      //hàm findIndex() if this returns a valid index, so something, else minus one (trả về -1) which would be the default otherwise,
      
      // const cartProduct=this.cart.items.findIndex(cp=>{
      //     // cp which is the product in the items array
      //     //// I want this function cartProduct to return true if I found the right product in my items array
      //     return cp._id === product._id
      // })

      //hàm findIndex() trả về valid index của mảng, thì then I know this product already exists in a cart. BUT HOW MANY of them?? so then I just need to find out what its quantity is.
      //Step 2: first of all we can assume that there will be no products in the cart because we're just starting from scratch
      
      
      //CÁCH 1: product.quantity=1; //is how you can add a field on the fly in javascript
            // //in items array, we add an object
            // const updatedCart={items:[product]};//items property which is an array where I will now include my product.
            // //https://www.w3docs.com/snippets/javascript/how-to-append-an-item-to-an-array-in-javascript.html

      //CÁCH 2 (more elegant , ES6 modern javascript)
        //how this works? use the javascript spread operator, three dots to pull out all properties of this object and then with a comma, you can add or overwrite a property (cụ thể, so here I'll add the quantity property and set it to one)
        //Bây giờ đã rõ ràng, configuring properties

        // I'm only storing the reference and the quantity and this is exactly the information I want.
        const updatedCart={items: [{productId: new ObjectId(product._id), productTitle:product.title , quantity:1}]}  //...product chính là bản copy của đối tượng product, bằng cách copy từng thuộc tính của đối tượng ban đầu qua đối tượng rỗng khác. Lý do là original object có thể được người khác sử dụng nên bạn không insert hay update trực tiếp lên nó, phải dùng bản copy
                                                                // tương tự copy các element trong một mảng bằng 3 dots
                                                                // kết quả trả về của embeded document là 1 reference tới ObjectId và thuộc tính quantity , những thuộc tính còn lại như userId của cartitem thì không cần lưu 
                                                                // sau khi Add to cart thì user trong CSDL chỉ có 1 product mà thôi. Lab6.18 sẽ lưu nhiều products trong cart
      const db=getDb();
      return db
        .collection('users')
        .updateOne(
            {_id:new ObjectId(this._id)},
            {$set:{cart:updatedCart}}  //simple quantity always 1, but, I don't want to overwrite the existing user.cart all the time with const updatedCart={items: [{productId: new ObjectId(product._id), productTitle:product.title , quantity:1}]} 
      ); //xem kết quả của AddToCart operation tại controllers >> shop.js >> postCart sẽ gọi req.user.addToCart(product)  

  }
  
  static findById(userId){ //userId có kiểu chuỗi , còn dữ liệu lưu trên mongoDB là ObjectId(userId) , có nghĩa là tác giả tạo 1 user trên mongo, sau đó ObjectId(userId) được mongo tự động tao, string id chính là userId (xem app.js)
    //still get access to my database client
    //access collection "users" and find a specific user
    const db=getDb(); 
    //https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
      ///the cursor method next() to access the first document (cũng là doc duy nhất sau khi lọc collection)
    //Cách 1:
    return db.collection('users')
             .findOne({_id:new ObjectId(userId)}) //should find me all fitting users and I therefore get back a cursor, do đó phải gọi next() để bước tiếp step by step to get the FIRST (ý nói collection đã lọc users có nhiều user object, thì lấy người đầu tiên cho dù mảng đó chỉ có 1 phần tử)
             .then(user=>{
                  return user; //là "MongoDB" user object, real user object nơi lưu access tới data thực sự trên Mongo
             })
             .catch(err=>console.error(err)); //fetch any err during fetching the user
    //Cách 2: return db.collection('users')..find({_id:new ObjectId(userId)}).next(); 
    //to get my document hoặc nếu không có thì null document, var myDocument = myCursor.hasNext() ? myCursor.next() : null;
    //call next to get the first and as we know only element that matters to us
    //ban đầu tui dùng .find(), nhưng to be sure, use findOne()
  }

}




module.exports = User;
