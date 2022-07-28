//lưu access tới instance của Mongoose class, bằng cách import mongoose module
const mongoose=require('mongoose');

//Schema là the user schema instance ? Không vì hover thấy typeof tưởng instance, thực ra là access tới class Schema , có thể tạo instance với access này
const Schema=mongoose.Schema; //nhấn giữ Ctrl + click xem code Schema
console.log(typeof(Schema),typeof(mongoose.Schema)); //function, function 
/*
    //Lab6.1
    class Animal --> constructor(height, weight, age)
    let z=Animal;  //z là access/reference to class Animal , nói dễ hiểu z là class Animal
    console.log("Kiểu dữ liệu của z vs Animal: ",typeof(z),typeof(Animal)); //function, function
    let e= new z();
    console.log("KDL của e: \n",typeof(e)); //object  (vì là Animal instance) 
    e.speak(); //ok
*/

//(official mongoose)
  ///Everything in Mongoose starts with a Schema.  (tài liệu official mongoose)
  ///Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
  //Schemas not only define the structure of your document and casting of properties, they also define document instance methods, static Model methods, compound indexes, and document lifecycle hooks called middleware.

//gọi constructor, rồi pass JS object vào constructor này

//By default, Mongoose adds an _id property to your schemas.
const userSchema= new Schema({
    //we describe how a user data aka document object should look like
    //Không thể tạo ra một Collection (Schema) chứa các Document một cách schemaless với Mongoose => quiz correct

    //Ở đây không khai báo _id, nhưng trong official mongoose có 
    //_id: Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    // we also used a cart before and I still want to embed the cart into my user document, that hasn't changed just because we use mongoose.
    // với mối quan hệ 1:1 thì không nên dùng reference mà document embedment

    //use Embedded document with cart
    cart:{
        //to store an array in here, you simply create an array
        // then you add, what is inside of this array? [String] as array of strings, numbers, booleans, documents 
        //I want to have an array of document object 
        // now, I need to get something from the schema, there we have a types field and there we got all these special types like object ID,
        
        //telling mongoose that this (item array) will actually store an ObjectId because it (array_item) will store a reference to a product (điều này là tất nhiên, vì thực ra các phần tử của mảng đều mang reference tới một đối tượng) and that this also is require
        //https://stackoverflow.com/questions/27286742/data-model-reference-using-objectid-in-mongoose
        //https://newbedev.com/comparing-mongoose-id-and-strings
           ///ObjectIDs are objects so if you just compare them with == you're comparing their references . 

        items:[
            //User model interact with Sanpham model thông qua "ref"
            {
                //Cách đặt tên: productId thì trong ngữ cảnh reference, còn khi populate(cart.items.prodId) vì order cần full product, thì reference sẽ chuyển thành embed toàn đối tượng lúc này có thể đổi tên thành product
                
                productId:{
                    type:Schema.Types.ObjectId,
                    required:true,
                    ref:'Sanpham'  //Chú ý: không có import Sanpham vào file này. The ref option is what tells Mongoose which model to use during population
                    //Model Sanpham có các thuộc tính: title,price,description,imageUrl
                    //xem populate productId của user thành ref:'Sanpham' 
                }, 

                quantity:{
                    type:Number,
                    required:true
                }
            }
        ]
    }
});


//you can extend mongoose with your own functionality
userSchema.methods.addToCart=function(product){//Why product parameter? we just need to ASSUME because we are the one writing the code in the end. (Trong javascript khi lần đầu cho 1 parameter vào nó sẽ undefined, nhiệm vụ người viết là giúp JS nhận ra project là một Product instance trong thân hàm addToCart)
    //the important part is it has to be a function written as 'userSchema.methods.addToCart' (dù không phải là arrow function thường thấy ở Javascript class) so that the this keyword in there still refers to the schema and not to something else
    //ok, the userSchema has this.cart.items array
    console.log(typeof(product));

    
    const cartProductIndex = this.cart.items.findIndex(cp => {
              //cả cp.productId và product._id đều là thuộc tính của Mongoose object được query từ MongoDB nên có  kiểu object. Mà 2 object không bao giờ === , nên phải toString() cả hai
              return cp.productId.toString() === product._id.toString();
              //unreachable code.WHY? vì sau return
              console.log(typeof(product));
              next();
            });

            //still want to control my quantity as before and update my cart as before
            //by first of all copying ...this.cart.items into array [] and access with updatedCartItems, then I only work with updatedCartItems
            let newQuantity = 1;
            const updatedCartItems = [...this.cart.items];
            //then I will keep the logic of checking whether we already do have the product in the cart
            if (cartProductIndex >= 0) {
                //calculate the new quantity based on the old quantity
              newQuantity = this.cart.items[cartProductIndex].quantity + 1;
              //in copy version, I update quantity
              updatedCartItems[cartProductIndex].quantity = newQuantity;
            } else {
                //pushing a new object (without Schema/Model) onto it.
              updatedCartItems.push({
                //Không yêu cầu  _id: false, thì mặc định Mongoose sẽ tạo _id với dạng ObjectId cho updatedCartItems
                //productId: new mongoose.ObjectId(product._id),   //NOT work like this
                productId: product._id,  //just store and mongoose should automatically wrap it in an ObjectId
                productTitle:product.title,//nên push document có cấu trúc schema, vì productTitle không có trong schema nên sẽ không lưu vào MongoDB
                quantity: newQuantity
              });
            }
        
            //đối tượng mới
            const updatedCart = {
              items: updatedCartItems
            };

            //now I don't need to get access to the database like this

            /*
            const db = getDb(); //getDb return connection 
            return db
              .collection('users')  
              .updateOne(
                { _id: new ObjectId(this._id) },  //update on user này
                { $set: { cart: updatedCart } }   //nếu chưa có cart property thì tạo mới, nếu có rồi thì overwrite
              );
            */

            //instead here, I will indeed return something but I will not manually update this
            this.cart=updatedCart;
            //the User instance saves itself by using the built-in save method where we update the cart
            return this.save();

}

userSchema.methods.removeFromCart=function(productId){
    //filter cho ta bản copy thỏa mãn điều  kiện
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart.items=updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart=function(){
  //set user's cart without items
  this.cart={items:[]};
  return this.save();  //update
}

//create Mongoose model which is a constructor bổ sung phần còn thiếu của Mongoose Schema (aka blueprint) (cùng lúc trên MongoDB sẽ có collection 'users' ) then export Mongoose Model constructor whose bound to schema
module.exports =mongoose.model('User',userSchema); //như vậy Mongoose Model (which is the constructor for document object, do đó viết hoa "U") sẽ ánh xạ tới collection có tên là "users"
//a bit of a more complex schema : we embed doc cart, inside cart there is an array, array contains documents
//But this is how a user document 
//Thông qua tên được truyền vào lúc export model ==> để nhận lại một Schema đã tạo





//------------------------------------------------------------------------------------
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User {
//   //constructor tức là User(các giá trị tham số)
//   //constructor được gọi với 'new' operator với các đầu vào giá trị
//   //như vậy bản chất class là hàm với đầu vào và đầu ra là instance this
//   //các hàm non-static đều yêu cầu this thực hiện hành động
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart; // {items: []} là cấu trúc của this.cart
//     this._id = id;
//   }//Sau khi tạo được User instance với các giá trị tham số, thì các thuộc tính this._id sẽ tham gia hàm updateOne()

//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this);
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new ObjectId(product._id),
//         productTitle:product.title,
//         quantity: newQuantity
//       });
//     }

//     //đối tượng mới
//     const updatedCart = {
//       items: updatedCartItems
//     };
//     const db = getDb();
//     return db
//       .collection('users')  
//       .updateOne(
//         { _id: new ObjectId(this._id) },  //user nào
//         { $set: { cart: updatedCart } }   //nếu chưa có cart property thì tạo mới, nếu có rồi thì overwrite
//       );
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map(i => {
//       return i.productId;
//     });

//     //gửi JS array gồm các SP trong cart, mỗi item chứa full data về SP và quantity của item đó
//        ///muốn vậy phải yêu cầu access tới database tên "test"
//        ///db() sẽ trả về a reference/access tới MongoDB collection tên "products" , nếu chưa tồn tại thì create implicitly 
//        ///Important: In MongoDB, a collection is not created until it gets content! MongoDB waits until you have inserted a document before it actually creates the collection.
//        //https://www.w3schools.com/python/python_mongodb_create_collection.asp
//     return db
//       .collection('products')
//       .find({ _id: { $in: productIds } })
//       //{ } chính là query để return all documents in collection 
//       //{ _id: { $in: productIds } } chính là return several documents that meet a condition 
//       //lúc viết find( thì thấy Intellisense: Array.find() call predicate once for each element of the array, returning the FIRST value of array element where predicate is true, and undefine otherwise
//       //mongodb Collection.find({ }) hay mongodb Collection.find(dieu_kien) đều trả về 1 cursor
//       //https://www.mongodb.com/docs/manual/reference/method/cursor.toArray/
//       .toArray()
//       .then(products => {
//         return products.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(i => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity
//           };
//         });
//       });
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString();
//     });
//     const db = getDb();
//     //code to update a specific user on database
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) }, //who is the user to be updated? 
//         { $set: { cart: {items: updatedCartItems} } }
//       );
//   }

//   addOrder(){ //Who calls this method to create "orders" collection ? Ang HOW this addOrder() can return a Promise?
//     //doesn't take any arguments because the cart which will be passed as an order or as the data for the order is already registered on this user
//     //I need to add the orders to my user or the other way around.
//     //reach out to my database client
//     const db=getDb();
//     //Nếu tạo order mới không dùng object={} hay new Constructor() như db.collection('orders').insertOne(this.cart) thì order đó chứa thông tin tất cả hàng trong cart, nhưng không biết user của order là ai. Làm sao 
//     //https://viblo.asia/p/javascript-object-trong-javascript-L4x5x44m5BM
//     //object lưu các items, và object có thể được iterate như mảng
    
//     //gọi hàm getCart() trong cùng file 
//     return this.getCart()   //Step 1
//       .then(products=>{
//            //Step 2 
//               /// Nhắc lại, Javascript có kiểu dữ liệu object (KDL phức hợp) được linh hoạt tạo ra theo yêu cầu của úng dụng
//               /// order object là sự kết hợp của KDL Product và KDL User
//            const order={
//              //đầy đủ thông tin sp trong cart
//               items:products,
//              //thông tin người user  some user data, not all but some
//              user:{
//                _id:new ObjectId(this._id), //trả về hàm ObjectId(hexadecimal string)
//                name:this.name,
//                email:this.email
//              }
//            }
//              //cách lưu trữ này sẽ duplicate thông tin trong users collection and orders collection. Nhưng tui không quan tâm nhược điểm này vì lập luận sau:
//                 /// the embeded user data in order might change for sure, but it doesn't need to be updated on all the orders because if you had like processed and open orders, for all processed orders, you wouldn't care too much if the user email changed because you might not need to touch it there. So now even if the user name would change, I could be fine with not changing it here and I care only changes in the users collection
//                 /// of course if you do care, you can always get rid of all the data.
//              //Như vậy tầm nhìn là thay vì trong MongoDB hiện nay 1 order{id,items_array} thì dự tính có thêm đối tượng user được tích hợp vào  
//              // I also want to store more information about my products in items of order, than just id and quantity   
//              //trong render ra view orders.ejs, có product.title tham gia ,thậm chí có thể hiển thị product.price   
//              //Therefore, storing some extra information would be useful too
//              //Muốn hiển thị title, price của product của user này thì phải làm việc (work on) the this.cart.items again  , and we need to fetch some data from our products database   
//              //trong hàm getCart() đã có được cart với enriched (fully populated) information about all products .
//              //So actually what we can do is in add order, I can first of all call this get cart and then add then to work with the data get cart gives me,  so with my updated products . these products will have all the product information (xuất phát từ products collection) along with the quantity (trích từ req.user.cart.items). I want these products be part of cart.items (done) and orders , too  
//              // I really don't care about that information changing because if it should change, for orders we need a snapshot anyways, if the price of a product changes, that doesn't affect the past order (we wouldn't want to update the price even if it would change.),
//              // for orders, such a snapshot and therefore an EMBEDED document is a great way of relating the ORDER and the PRODUCT because the product data might be duplicate but it doesn't need to change in the ORDERS collection because there, we want the snapshot.
//              //https://www.mongodb.com/docs/cloud-manager/reference/api/snapshots/
     
//              //trả về insertion operation, ban đầu insertOne(this.cart) nhưng thiếu thông tin user, nên thay thế
//              return db.collection('orders').insertOne(order); //Step 3
      
//     })   
//       .then(result=>{ //Step 4
//           //succeeded insertOne(order) to database và Promise đã hoàn thành
//           //LOCALLY với req.user, I will empty my cart at this point vì toàn bộ items đã vào order 
//           this.cart={items:[]};

//           //REMOTELY, thì clear trong cart items trong database 
//           //code to update a specific user on mongodb then set his CLEARED cart
//           db
//               .collection('users')
//               .updateOne(
//                 { _id: new ObjectId(this._id) }, //who is the user to be updated? search here
//                 { $set: { cart: {items: []} } }
//               );

//           //So now I cleared both cart.items in the req.user object as well as in the database
          
//           //TÓM TẮT QUY TRÌNH
//           /*
//                 the order is 
                
//                 (Step 1) we get the cart which is essentially an array of products, 
                
//                 (Step 2) we create an order with THAT products and some date from req.user

//                 (Step 3) then we insert this order object into our orders collection, that's new doc, we need to insert that, 
                
//                 (Step 4) sucessfully insertion operation, we'd return the

//                 result of that

//                 and then here, we know that we were successful with inserting this and we clean up our existing cart.

//                 và clear nội dung của user.cart.items 
//           */

//       })
//   }

//   getOrders(){
//     //reach out to database "test"
//     const db=getDb();
//     //we reach out to our orders collection and find() to find ALL orders for that user!
//     //đầu tiên là compare userid với _id của user Object thuộc order 
//     //user._id là user holds an embeded document. MongoDB BSON ObjectId dùng để định danh duy nhất (bên RDBMS có Primary Key)
//     /*
//        javascript find() method
//        VD [circle,circle,square,square].find(square) --> square
//     */
//     //we can find more than 1, so use toArray() shortcut and Mongodb server sends JS array of orders to Node for that userId
//     return db
//         .collection('orders')
//         .find({'user._id':new ObjectId(this._id)})
//         .toArray(); //mongodb sends JS array of orders for Node client
//         //then we output that order information
//   }

//   static findById(userId) { //https://www.softwaretestinghelp.com/mongodb/objectid-mongodb/
//     //The ObjectId is a combination of time, random value and counter value
//     //Each time when we call the ObjectId như X = ObjectId(), it creates a unique hexadecimal value như trong mongodb
//        ///it’s just declaring the object ID without any parameter as a method.
//        ///each time when we call ObjectID(), it will reserve a specific location within the virtual memory for a mongodb document
//     //userId tham số là 
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new ObjectId(userId) })  //Define Specific ObjectId Hexadecimal với tham số xác định. VD y = ObjectId(“5bf142459b72e12b2b1b2cd”)
//       .then(user => {
//         //console.log(user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = User;
