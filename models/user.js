const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: [ ]} , trong mảng là  { productId, quantity}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;

    //Step 1: tạo snapshot (bản copy) của mảng các product trong cart của người này, và các phần tử cần thêm vào cart sẽ được cấu hình ứng với 2 cases là đã từng có trong cart hay chưa từng có trong cart 
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity
      });
    }

    //Step 2: Phối hợp 2 biến phụ là updatedCart và updatedCartItems
    const updatedCart = {
      items: updatedCartItems
    };
    const db = getDb();

    //Step 3: ghi đè lên {items: []} và return cho bên gọi là req.user.addToCart(product)
       /// So sánh addToCart() vs addOrder() thì addToCart chỉ add product vào 1 item của req.user.cart.items.x nên phải dùng updateOne() chứ không dùng Collection.insertOne(product) nghĩa là thông tin product chiếm hết 1 document của users collection ! 

    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) }, 
        { $set: { cart: updatedCart } }   //chắc chắn this có thuộc tính cart, do req.user là User instance với dữ liệu fetched về từ mongodb
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(i => {
      return i.productId;
    });
    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        return products.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString();
            }).quantity
          };
        });
      });
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: {items: updatedCartItems} } }
      );
  }

  addOrder(){
    const db=getDb();
    //insertOne nếu document có chứa sepecial field như _id thì sao?
    //insertOne(this.cart) là hợp lý vì cart có thể chiếm 1 doc của orders 
    ////this.cart là biến chứa access (bài giảng nói this.cart refers to user instance's cart)
    return db.collection('orders')
             .insertOne(this.cart) //chỗ này có thể thêm nhiều fields khác, vd Total_of_Value
             //store my cart ,chắc chắn có products trong cart, nếu không trang web sẽ báo "No products in cart"
             .then(result=>{
               //completed insertation, tiếp theo là làm rỗng cart
                this.cart={items:[]};
                //tiếp, clear cart trên CSDL users, do cart là phần nhỏ nên updateOne
                return db
                  .collection('users')
                  .updateOne(
                      {_id:new ObjectId(this._id)},
                      {$set:{cart:{items:[]}}}
                  )
             })
             //Tóm lại: có 2 database operations : insertOne và updateOne, còn req.user.cart.items được cập nhật về 0
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
