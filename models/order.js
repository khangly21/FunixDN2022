//import mongoose instance, để giúp schema hóa MongoDB
//we have mongoose imported into our file we can utilize all the functionality that it provides. 
const mongoose = require('mongoose');

//We will first use mongoose to call the Schema constructor. 
//Let’s create an instance of a Schema constructor using mongoose.
//From mongoose's properties, extract class function or constructor Schema 
const Schema = mongoose.Schema

//Như vậy có class Schema để tạo thực thể orderSchema để được làm nguyên liệu cho hàm mongoose.model()

//The instance of schema can now be used to define a schema. Let’s create it.
//define our order schema instance and to know how order documents should look like
const orderSchema = new Schema({
    //tham khảo cấu trúc order của database test: order gồm mảng các sản phẩm (đầy đủ thông tin của schema product) và user (name, email)
    //I used "items" in MongoDB without Mongoose, now I name "products" which is an array of documents 
    /*
        products will be an array of documents and every document will let's say have the productData
        which will be of type object because this will be a full other document you could say that is required
        and besides the product data , I'll have to quantity for that product
    */
    products:[{
        productData:{type:Object,required:true},
        quantity:{type:Number,required:true}
        /*of course we could define the full nested product with all the properties there,
feel free to do that, */
    }],
    users:{
        name:{type:String,required:true},
        
        //tên biến "userId" không quan trọng, phải có ref:'User', vì userId là hexa string reference của một Model nào đó
        userId:{
            type:Schema.Types.ObjectId,
            required:true,
            //reference to User model 
            ref:'User'
        }
    }
});

module.exports=mongoose.model('Order',orderSchema); 
//collection 'orders' trên MongoDB được tạo ra lúc nào?
   /// từ interactions giữa các Models ? KHÔNG có vì các model còn lại không có ref Order
   /// Lúc mongoose.connect() sync với mongoose.model() ? maybe


/*
    Mongoose nổi tiếng với chức năng "object modeling", nghĩa là "real-object modeling into software's classes and instances "
    Phần trên thì real-object là user đã được cài đặt thành 'class' và thầy gọi là blueprint 
    Nhưng 'class' trên chưa có constructor cho các thực thể của nó
    Do đó hàm mongoose.model() sẽ tạo ra constructor là Order giúp new thực thể kế thừa các hàm tự định nghĩa hoặc built-in methods (class methods hay instance methods) của mongoose
    Do đó controller chỉ việc yêu cầu model class gọi static methods, hoặc yêu cầu model instance gọi nonstatic methods
 
*/

