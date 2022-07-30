//lưu access tới instance của Mongoose class, bằng cách import mongoose module
const mongoose=require('mongoose');

//Schema là the user schema instance ? Không vì hover thấy typeof tưởng instance, thực ra là access tới class Schema , có thể tạo instance với access này
const Schema=mongoose.Schema; //nhấn giữ Ctrl + click xem code Schema
console.log(typeof(Schema),typeof(mongoose.Schema)); //function, function 

//By default, Mongoose adds an _id property to your schemas.
const userSchema= new Schema({
    

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
   
    cart:{
        

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
