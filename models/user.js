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
      
      //this tức là req.user which is already the User instance sẽ gọi req.user.addToCart(product)
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
      //Bước kế tiếp, tạo bản copy của mảng this.cart.items bằng cách [...this.cart.items], rồi lưu access tới bản copy vào updatedCartItems, mọi chỉnh sửa sau này sẽ thực hiện trên updatedCartItems
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

  getCart(){
    // get cart exists on the user who already has this cart property, this is the mongodb way of thinking about relations/ASSOCIATIONs,
    //This is WHY we don't need to reach out to a `cart` collection because there is no such collection, instead
    //here we can simply return this cart and that's it,
    //this gives us access to the user cart.
    //Vì tính tích hợp thông tin của json, Obviously we could have directly (not use the INNER JOIN as intermediate like Relational ) accessed the cart property on the user if we wanted to
    
    //Bắt đầu viết thân hàm
    //Cách 1:
    //return this.cart;  //instead of just returning this cart, it would be interesting to return a fully populated cart, so a cart with all the product details which we also require
  
    //Cách 2: 
       /// reach out for db again 
       /// so let's get access to our database client and let's return the result of a database operation
       /* 
          //product cuối cùn là
          {"_id":{"$oid":"62b94a87cd9e4b4db04bc0d3"},
            "title":"wdcdwcwd","price":"2",
            "description":"ceeceecec",
            "imageUrl":"wdwcwddwcwdwdc",
            "userId":{"$oid":"62b8211988e99bcbaf8e97ff"}
          }
       */
      // (Về  đầu vào, ) because I have all the user data,  I have all the cart data,
      // now I need to fill it with some live from the products database
      // and there I want to find all products that are in my cart.
      //Now how can I do that? Well for this, we can use a special query syntax mongodb supports.
      const db=getDb();
      //tạo mảng các productId từ mảng cart.items theo cách cũ là map
      const productIds=this.cart.items.map(i=>{
          //use map to transform every item in cart.items thành một bản copy với các items được hàm nhận và trả kết quả
          return i.productId;  //STRING ?? as he said
          //nếu không muốn thay đổi gì thì map(i=> {return i}) đon giản ra một bản copy 
          //what I'm doing is I'm mapping an array of items where every item is a javascript object into an array
          //of just STRINGs, of just the product IDs and this is then stored in this const productIds  
      })
      //tell mongodb give me all elements where the ID is one of the IDs mentioned in this array here , which is array of cartitems' id.
      //this return gives me a cursor with all the matching products in array. SO we need to construct this array! Đó chính là productIds
      //vì sao mảng.find() là trả về 1 array, mà ở đây cần hàm toArray . 
         ///Không phải trả về javascript array mà là 1 mongodb cursor (pointer which holds all references towards (all) documents found in a collection) . Vậy JS array và MongoDB cursor có tính chất giống nhau ?
         ///In mongo shell, you are allowed to iterate the MongoDB cursor and display the resultant document in the created JS  array using toArray() method : Syntax is  cursor.toArray() 
         ///Tầm quan trọng của VỊ TRÍ của .toArray() : https://stackoverflow.com/questions/37024829/cursor-map-toarray-vs-cursor-toarray-thenarray-array-map
         ///$in operator. And this operator takes an array of IDs and therefore every ID which is in the array will be accepted and will get back A cursor which holds referenceS to all products with one of the IDs mentioned in this array.
         ///Lý thuyết MongoDB cursor và các hàm của nó:  https://www.geeksforgeeks.org/mongodb-cursor/
      console.log("xem mongodb's Cursor được trả ra từ array.find() để giải thích tại sao cần toArray(): \n" , db.collection('products').find({_id:{$in:productIds}}));  //sẽ xem được Cursor
      console.log("xem kết quả của array.find().toArray() để giải phóng cursor và tạo JS array: \n", db.collection('products').find({_id:{$in:productIds}}).toArray() ); // sẽ xem được JS array? Kết quả là   Promise <pending>

      
      return db
                .collection('products')
                //chú ý hàm find() được dùng ở MongoDB và Node , và find() là built-in Javascript function
                    /// ở MongoDB: .find({_id:{$in:productIds}}) --> trả về a cursor chứa tất cả references đến các đối tượng 
                    /// ở Node: this.cart.items.find(i=>         --> trả về mảng chứa tất cả references đến các đối tượng 
                //Diễn ra find() trên MongoDB, find() method is used to find the documents present in the given collection, then this method returned a pointer which will points to the documents of the collection, now this pointer is known as cursor (xem tại geeks)
                .find({_id:{$in:productIds}}) // Cơ chế của hàm collection.find() Bước 1: trả về cho tui  a cursor which holds references to all products, Bước 2 : but then filter with one of the IDs mentioned in this array, skip the remaining (find() method return a cursor with contain all documents thỏa đk $in)
                //https://www.mongodb.com/docs/manual/reference/method/cursor.toArray/
                   /// Cơ chế: The toArray() method returns an array that contains all the documents from a cursor. The method iterates completely the cursor, loading all the documents into RAM and exhausting the cursor.
                   /// return: anb array of documents, và documents ở dạng JS objects
                .toArray() //MongoDB dùng JS runtime để tạo bản JS array từ các MongoDB documents đồng thời giải phóng (exhaust) the cursor lưu JS vào RAM của client Node //MongoDB server's builtin JS runtime sẽ tạo JS array chứa các phần tử giống như cursor đang chứa, rồi chuyển JS array cho client là Node process ! 
                // Teacher: look confusing but in the end Node client have an JS array of products here fechted from the MongoDB server
                .then(products=>{

                  console.log("Lọc bảng products lấy các sp có trong cart: \n");
                  
                  //LOCATION now: sau khi .toArray thì mảng đã được MongoDB server chuyển tới Node client, nên hiện đang xử lý mảng ở Node
                  //all products IN CART
                  //want to add the quantity back to every product because that is something that is important,  how can we get that information back into there?
                  // I'll again return a mapped version of my data,mapped version of my products JS array where every product will be converted a little bit
                  //I'll return a new object (keep all the data I retrieved but then I'll add a new quantity property and that quantity property of course needs to be populated with data) for every product which is fine because every product is an object. 
                  //Nghĩa là vẫn cách làm cũ: không sửa trực tiếp trên các elements của products , mà sửa trên bản copy của products
                  return products.map(p=>{
                    //map takes a function that executes on every element p of array products 
                    //products là JS array được fetched từ MongoDB , sau đó Node nhận nó
                    //quantity là thuộc tính của cartitem. How to access quantity??
                    //Now we of course have the products stored in the cart of this user   :  this.cart.items
                    //make sure this map-calling function binds to "this", so that this function can call "this" inside its body! How to do that? use arrow function 
                       ///HOW? make sure you use ARROW functions here to ensure that this inside of this function STILL refers to the overall class
                       ///WHY? có lẽ arrow function là hàm không tên nên JS không implicitly tạo 1 biến có tên trùng tên hàm để lưu access tới đối tượng hàm. Khi yêu cầu biến này kích hoạt hàm sẽ rất dễ loose class 
                       ///with NORMAL functions it would (có thể) not (refer to class)
                      
                    //trong "innerjoin collection", tạo một p mới nhận tất cả những gì của p và thêm quantity 
                    //mapped version , trong đó this.cart.items.find() tìm tất cả product documents trong cart.items, sau đó giới hạn lại chỉ chọn MỘT giá trị quantity của MỘT productId tương ứng p đang xét

                    //return a new object version for each p, với dữ liệu của p và trộn với quantity của p đó trong cart

                    //again dùng buitl-in javascript method find()
                    return {...p,quantity:this.cart.items.find(i=>{
                                                              return i.productId.toString()===p._id.toString();
                                                          }).quantity
                    }
                  })

                })
      //Tóm tắt cách làm: 
          /// đầu tiên, getCart không dùng trực tiếp this.cart.items với this là req.user ,which is User instance with Mongo data, mà Node đang nắm giữ
          // Không dùng trực tiếp nó để chỉnh sửa trên đó vì nhiều người dùng sẽ mất tính bảo mật
          // Phải lọc collection "products" ra bản copy X các sp mà cart đang có , nhưng từng product trong đó không có quantity 
          // Vì vậy dùng X.map để tạo bản copy của X , sau đó chỉnh sửa từng phần tử (thêm thuộc tính quantity rồi assign có giá trị duy nhất của sản phẩm tương ứng bên cart)
          // collection "products" đã nhờ cart.items để lọc ra bảng "products mới chỉ chứa các sp trong cart" which lần nữa nhờ cart.items cung cấp quantity tương ứng cho từng product
          // Cuối cùng tui nhận được product object (người xem chỉ muốn biết reference là productId là gì) in cart với quantity , sau đó tui extract quantity từ object này
             ///this is what we need to do in mongodb if we then have a connection between two collections with a reference
             ///we need to merge them manually (không tạo hàm tự động như Sequelize) as we are doing it here and with that merging being done manually here, we can now use that data.
             ///we can use in view, because getCart() returns all the information we need 
             /// we can use in view, because getCart() returns all the information we need about product và quantity

  }
  
  static findById(userId){ //userId có kiểu string có '' tham gia làm tham số '62b8211988e99bcbaf8e97ff' , còn dữ liệu lưu trên mongoDB là ObjectId(userId) , có nghĩa là tác giả tạo 1 user trên mongo, sau đó ObjectId(userId) được mongo tự động tao, string id chính là userId (xem app.js)
    //still get access to my database client
    //access collection "users" and find a specific user
    const db=getDb(); 
    //https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
      ///the cursor method next() to access the first document (cũng là doc duy nhất sau khi lọc collection)
    //Cách 1:
    return db.collection('users')
             //https://www.mongodb.com/docs/v4.4/reference/method/db.collection.findOne/?_ga=2.78621076.1248990970.1655885598-781563707.1655885598//
             .findOne({_id:new ObjectId(userId)})  //tìm all trên MongoDB sau đó chọn một FIRST user  according to the natural order which reflects the order of documents (same as insertion order) on the disk (trong tất cả users thỏa đk) có _id có giá trị ObjectId("62b8211988e99bcbaf8e97ff")
             //should find me all fitting users and I therefore get back a cursor, do đó phải gọi next() để bước tiếp step by step to get the FIRST (ý nói collection đã lọc users có nhiều user object, thì lấy người đầu tiên cho dù mảng đó chỉ có 1 phần tử)
             .then(user=>{ //Câu hỏi là mảng user từ MongoDB server được fetch về RAM của NodeJS  client khi nào? khi User.findById('62b8211988e99bcbaf8e97ff') sẽ nhận được return của database opreration là user trong then() cuối cùng hoặc err
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
