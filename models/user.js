//lưu access tới instance của Mongoose class, bằng cách import mongoose module
const mongoose=require('mongoose');

//Schema là the user schema instance ? Không vì hover thấy typeof tưởng instance, thực ra là access tới class Schema , có thể tạo instance với access này
const Schema=mongoose.Schema; //nhấn giữ Ctrl + click xem code Schema
console.log(typeof(Schema),typeof(mongoose.Schema)); //function, function 
/*
    //Lab6.1
    class Animal --> constructor(height, weight, age). Vậy class là 1 hàm
    let z=Animal;  //z là access/reference to class Animal 
    console.log("Kiểu dữ liệu của z vs Animal: ",typeof(z),typeof(Animal)); //function, function
    let e= new z();
    console.log("KDL của e: \n",typeof(e)); //object  (vì là Animal instance) 
    e.speak(); //ok
*/

//(official mongoose)
  ///Everything in Mongoose starts with a Schema.  (tài liệu official mongoose)
  ///Each schema maps to a MongoDB collection and defines the shape of the documents (hình hài document phải tuân thao) within that collection.
     //// cũng như a clientside cookies maps a clientside user to a serverside session
     //// Mongoose by default produces a collection name by passing the model name to the utils.toCollectionName method. This method pluralizes the name. (https://mongoosejs.com/docs/guide.html)
  // Schemas not only define the structure of your document and casting of properties, they also define document instance methods, static Model methods, compound indexes, and document lifecycle hooks called middleware.

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


//you can extend mongoose 's built-in methods with your own functionality

//khi nhấn nút Add to cart thì TypeError: req.session.user.addToCart is not a function
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

//tạo lớp đối tượng class User, tương ứng trên MOngoDB sẽ tạo ra collection tên là users
module.exports =mongoose.model('User',userSchema); 
