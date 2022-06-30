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
  //req.user.addToCart(product);
  addToCart(product){  //WHEN? postCart
      let updatedCart;

      if(this.cart.items){

      
          //this tức là req.user which is already the User instance sẽ gọi req.user.addToCart(product)
    
          //xem product có tồn tại trong cart hiện tại không bằng cách tìm index
          const cartProductIndex=this.cart.items.findIndex(cp=>{
              if(cp._id){
                return cp._id.toString() === product._id.toString() 
              }

              if(cp.productId){
                return cp.productId.toString() === product._id.toString() 
              }
              
          })
    
          let newQuantity=1 ; 
          
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
            
             //add a new one, chỉ lấy 3 thuộc tính, hàm này không thích để product có _id như hàm addToCart_Lab6_16
            updatedCartItems.push({productId: new ObjectId(product._id), productTitle:product.title , quantity:newQuantity});
          }
    
    
          //Kết quả của 2 phân nhánh trên sẽ được gán vào items
          //đây là sự dynamic hóa cho updatedCart của Lab6.16 với const updatedCart={items: [{...product , quantity:1}]}  
          updatedCart={items: updatedCartItems} //updatedCartItems với newQuantity
          // I can safely have my updated cart down there and save that to the database with all the updated items
                   
    }else{
        //user(_id,name,email) chưa có thuộc tính cart 
        //ứng dụng Lab6.16 , update lấy tất cả thuộc tính của product
        updatedCart={items: [{...product , quantity:1}]} 
    }



      const db=getDb(); //Internet access + MongoDB access
      return db
        .collection('users')
        .updateOne(
            {_id:new ObjectId(this._id)},
            {$set:{cart:updatedCart}} 
      ); 

      //Tip: so sánh addToCart(product) giữa Lab6.16 và Lab6.19_Phan2
  }

  addToCart_Lab6_16(product){ //WHEN? postCart , WHAT drawback? dùng hàm này sẽ ghi đè tất cả những gì đang có trong cart
    /*
       //Dùng khi tạo user(_id,name,email) không có thuộc tính cart, thì hàm này dùng $set để tự động thêm thuộc tính cart vào 
    */
    const updatedCart={items: [{...product , quantity:1}]}
    //database "test" access
    const db=getDb();
    //trước kia insertOne(this) là add 1 object doc vào collection
    //bây giờ update 1 target document, và tham số thứ hai là object to specify how to update  => I'll use $set where I pass an object which holds all the information about which field to update in which way
    return db.collection('users').updateOne(  //nghĩa là cart lúc nào cũng có 1 product, cứ addToCart là update lại product duy nhất
      {_id:new ObjectId(this._id)},
      {$set:{cart:updatedCart}} //$set --> Nếu biến cart chưa tồn tại, thì tạo biến đó as user's property cùng giá trị này . Nếu đã có rồi thì ghi đè
      //Cơ chế của $set: So cart which I expect to have in a user in the database will now receive updated cart, so this object as a new value which will overwrite the old one in MongoDB 
    
      //Nhược điểm: for now it will always overwrite ANY existing products in the cart, we'll fix this later
    )

}

  getCart(){
      const db=getDb();
      let productIds;
      //ban đầu user sẽ không có cart nào nên this.cart.items sẽ undefined
      if(this.cart.items){
          productIds=this.cart.items.map(i=>{
              if(i.productId){
                return i.productId;
              }
              return i._id;  
          })
      }
      
      return db
                .collection('products')
                .find({_id:{$in:productIds}}) 
                .toArray() 
                .then(products=>{
                  console.log("Lọc bảng products lấy các sp có trong cart: \n");
                  return products.map(p=>{
                    return {...p,quantity:this.cart.items.find(i=>{
                                                                  if(i.productId){
                                                                    return i.productId.toString()===p._id.toString();
                                                                  }else{
                                                                    return i._id.toString()===p._id.toString(); 
                                                                  }    
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

  deleteItemFromCart(productId){
    //first of all , copy all existing cart items tạo thành bản array copy , and then the built in filter method
    //filter() , this is again a method provided by vanilla javascript
    //Filter allows us to define a criteria on how we want to filter the elements in that array, then it will return a new array with all the filtered items
    // "this" là req.user instance đang được tất cả các router sử dụng 
    //so all the items that make it through the filter.
    const updatedCartItems=this.cart.items.filter(item =>{
      //we return true if we want to keep the item in the new array or false if you want to get rid of it from the array.
      //https://www.geeksforgeeks.org/es6-array-filter-method/
      //The Array filter() is an inbuilt method, this method creates a new array with elements that follow or pass the given criteria and condition.
      /*
         
         var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
         var result = numbers.filter(number => number > 5);

         //(number => ) đang undefined , nhưng sau mũi tên thì xác định number là kiểu dữ liệu number của Javascript 

      */

      //Now I want to keep all items except for the item which we're deleting
      //cấu trúc của cart item nằm trong user.js 
      /*
         {
            productId,
            quantity
         }
      */
      // I want to get rid of it for this condition
      //VD muốn delete id=2 thì duyệt mảng thấy return 2!==2 sẽ thành return true, sẽ loại 2 khỏi mảng 
      if(item.productId){
        return item.productId.toString() !== productId.toString();  
      }
      if(item._id){
        return item._id.toString() !== productId.toString();  
      }


      
      //return true here if I want to keep the item
      //return false if I want to get rid of it.
      //chú ý là ObjectID("12345") không bao giờ == ObjectID("12345") , do đó muốn so sánh phải .toString() 
      //now we have the updated cart items (these is already are the cart items with the one item we wanted to get rid of removed.)
      //we just need to save back to our cart and therefore to the database

    });
    const db=getDb();
    return db
      .collection('users')
      .updateOne(
        //vị trí user có _id nào
        {_id:new ObjectId(this._id)},
        //how to update that document: save the updatedCartItems to database
        {$set: {cart:{items:updatedCartItems}}} //update the cart to have all cart items except for the one we deleted.
      )
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
