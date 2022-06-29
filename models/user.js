const mongodb=require('mongodb');
const getDb=require('../util/database').getDb;


const ObjectId=mongodb.ObjectId; 

class User{
  //thông tin của new users:
  //constructor có reference thì chỉ có thể tới từ new một user instance
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

  //0 reference có 2 trường hợp: 1/ Không có instance nào gọi , 2/ req.user= new User( ,, , ) gọi , nhưng req.user có ở khắp router do req được gởi tới API nên VSC không liệt kê danh sách các vị trí files
  addToCart(product){
      //I can have all the logic I need to find out if that product is already inside of the cart and therefore if I just want to increase the quantity or if it is not and therefore I want to postAddProduct it for the first time.
      //this is non-static method, so  must not forget that add to cart will be called on a user object
      //we'll create that object with data we fetched from the database with the help of this.findByID, will return a user.
      //giả sử user có thuộc tính cart , then now we just need to find out if that cart contains a certain product already. How? we could create a new constant, cart product and then use this cart items and find, let's say the index of a product in that cart with the same ID as the product we're trying to add again
      //dùng hàm findIndex() trên mảng, return the index of the first element in array where the predicate is true, return -1 otherwise
      //findIndex() which simply is a function javascript will execute for every element in the items array
      //hàm findIndex() if this returns a valid index, so something, else minus one (trả về -1) which would be the default otherwise,
      
      const cartProductIndex=this.cart.items.findIndex(cp=>{
          console.log("KDL của cp và cp._id: \n",typeof(cp),typeof(cp._id)); //object, undefined
          console.log("KDL của product và product._id: \n",typeof(product), typeof(product._id)); //object , object 
          console.log("KDL của cp và cp.productId: \n",typeof(cp),typeof(cp.productId)); //object, object
          console.log(cp.productId,product._id); //62b8211988e99bcbaf8e97ff   62b8211988e99bcbaf8e97ff  . Tuy nhiên dưới con mắt của Javascript, chúng là object
          //Dòng này ban đầu được thầy viết
          console.log(cp.productId === product._id); //false. Oh, 2 objects but why?? Lý do là 2 object không bao giờ == . Muốn so sánh phải .toSring() cả hai

          //tài liêu không dùng new nữa
          console.log('X: \n',new mongodb.ObjectId("62b8211988e99bcbaf8e97ff"))===console.log(new mongodb.ObjectId("62b8211988e99bcbaf8e97ff"))  // X: 62b8211988e99bcbaf8e97ff  62b8211988e99bcbaf8e97ff
          console.log('Y: \n',new mongodb.ObjectId("62b8211988e99bcbaf8e97ff"))==console.log(new mongodb.ObjectId("62b8211988e99bcbaf8e97ff"))   // Y: 62b8211988e99bcbaf8e97ff  62b8211988e99bcbaf8e97ff  (đáng lẽ ra false )
          //mà gọi trực tiếp constructor không có new, 
              /// theo tài liệu sẽ lưu trên mongo như sau: ObjectId("507f1f77bcf86cd799439011")
              /// còn Javascript thì nhìn ObjectId("507f1f77bcf86cd799439011") như 1 string nên log ra 507f1f77bcf86cd799439011, thực chất không là type string. Muốn type string phải .toString()
          console.log("mà gọi constructor không có new, \n",mongodb.ObjectId());
          //VD giá trị của _id trên mongodbs
          console.log(mongodb.ObjectId("62b8211988e99bcbaf8e97ff")===mongodb.ObjectId("62b8211988e99bcbaf8e97ff"));//false, giải thích Two separate JavaScript objects are never == to each other.: https://stackoverflow.com/questions/51068072/mongo-objectids-not-equal-to-eachother
          
          console.log(cp.productId.toString() === product._id.toString()); //true
          console.log(product._id.toString()); //62b8211988e99bcbaf8e97ff     is the string representation of the ObjectId(). This string value has the format of ObjectId(...) , nên không có  '  ' 
          console.log(typeof(product._id.toString()));  //string (in the eyes of Javascript) 
          console.log(typeof('507f191e810c19729de860ea')); //string   (thực ra đó là hexadecimal string)
          //https://www.mongodb.com/docs/manual/reference/method/ObjectId.toString/
          //https://www.mongodb.com/docs/manual/reference/method/ObjectId/

          // (PROBLEM: làm sao tránh 2 ids trùng nhau trên mongodb) I have to query mongodb first to make sure that the id generated by ObjectId() method is unique. Is there any way that I can generate unique object id without accessing mongodb twice?
             /// https://stackoverflow.com/questions/8723229/how-to-generate-unique-object-id-in-mongodb
             ///Object IDs are not like sequential ids you use in a RDMS. If they are properly generated according to the "ObjectID specification" you will not need to worry about them being unique.


          // biến cp sẽ thay đổi giá trị liên tục. Vì không có cart.items nó sẽ undefined, trong khi ở đây cp được nhận từng item của mảng trong loop mảng
          // cp which is the product in the items array , will it pass the test?
          //tài liệu về findIndex và hàm callback của nó:
          //See also the find() method, which returns the value of an array element, instead of its index.

          //make sure we only work with strings in both if and else branches
          return cp.productId.toString() === product._id.toString() 
          //nếu ghi cp._id.toString() thì TypeError: Cannot read properties of undefined (sửa là productId)
          //tài liệu mongodb nói instance của ObjectId class có thể gọi hàm toString()   //https://www.mongodb.com/docs/manual/reference/method/ObjectId.toString/

          //telling javascript that this should only return true if these two do not only match by value but also by type
          //boolean , true thì cp sẽ pass this test
          //chú ý type của product._id   nhé, không phải type string mà là type object. PHía gọi hàm này là controller >> shop.js >> postCart 
          // tuy nhiên product này lấy từ MongoDB chứ không phải javascript instance theo 1 class 
          //MongoDB product có id kiểu ObjectID, còn js instance có id kiểu string vì post input hidden
      })

      let newQuantity=1 ; 
      
      //dùng bản copy mảng items bằng object spread operator (...) 
          ///[...this.cart.items] trả về mảng copy . Cơ chế là gì? ...this.cart.items có các item , copy từng item vào [  ] được cách nhau bằng dấu phẩy . Trở thành [item1,item2,item3,...]
          /// VD https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            /*
                const numbers = [1, 2, 3];
                console.log(sum(...numbers));
                // expected output: 6 , vì copy từng phần tử rồi cách nhau bằng dấu phẩy. Ta sẽ có sum(1,2,3)
            */
      //Bước kế tiếp, lưu trữ access/ref tới mảng copy trên
      const updatedCartItems= [...this.cart.items];
      //I can now edit this array without touching the old array due to the way javascript works with reference and primitive types.
      //need to differentiate, do we already have that item in the cart or not.
      if(cartProductIndex >= 0){   //rẽ vào nhánh if này khi return cp._id.toString() === product._id.toString() => true => findIndex() trả về valid index >= 0
          newQuantity=this.cart.items[cartProductIndex].quantity + 1;
          // access updatedCartItems for the cart product index I found
          //access existed existed cartitem and then set its quantity equal to newQuantity   
          updatedCartItems[cartProductIndex].quantity=newQuantity; 
      }else{
         //nếu productId không có trong cart, array.findIndex sẽ trả về -1  .Nhánh else này sẽ gặp khi return cp._id === product._id => false => findIndex() trả về -1 (invalid index) . Lúc đó Add to cart cùng 1 SP 3 lần thì tạo mới 3 cartitem với quantity:1 each
        //add a new one
        updatedCartItems.push({productId: new ObjectId(product._id), productTitle:product.title , quantity:newQuantity});
      }
      //Kết quả của 2 phân nhánh trên sẽ được gán vào items
      const updatedCart={items: updatedCartItems} //updatedCartItems với newQuantity
      // I can safely have my updated cart down there and save that to the database with all the updated items
                                                                
      const db=getDb(); //Internet access + MongoDB access
      return db
        .collection('users')
        .updateOne(
            {_id:new ObjectId(this._id)},
            {$set:{cart:updatedCart}} 
      ); 
  }
  
  static findById(userId){ //userId có kiểu string có '' tham gia làm tham số '62b8211988e99bcbaf8e97ff' , còn dữ liệu lưu trên mongoDB là ObjectId(userId) , có nghĩa là tác giả tạo 1 user trên mongo, sau đó ObjectId(userId) được mongo tự động tao, string id chính là userId (xem app.js)
    //still get access to my database client
    //access collection "users" and find a specific user
    const db=getDb(); 
    //https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
      ///the cursor method next() to access the first document (cũng là doc duy nhất sau khi lọc collection)
    //Cách 1:
    return db.collection('users')
             .findOne({_id:new ObjectId(userId)})  //tìm trên MongoDB _id có giá trị ObjectId("62b8211988e99bcbaf8e97ff")
             //should find me all fitting users and I therefore get back a cursor, do đó phải gọi next() để bước tiếp step by step to get the FIRST (ý nói collection đã lọc users có nhiều user object, thì lấy người đầu tiên cho dù mảng đó chỉ có 1 phần tử)
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

module.exports = User;   // 👈 Export class
