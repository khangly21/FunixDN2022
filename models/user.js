const mongodb=require('mongodb');
const getDb=require('../util/database').getDb;

const OnjectId=mongodb.OnjectId;

const ObjectId=mongodb.ObjectId; 

class User{
  
  constructor(username,email,cart,id){
      this.name=username;
      this.email=email;
      
      this.cart=cart;
      this._id=id; 
  }

  sayHi(){
    console.log('H E L L O W O R L D !')
  }

  save(){
    
    const db=getDb();
   
     return db.collection('users').insertOne(this); 
   
  }

  addToCart(product){
    
        const updatedCart={items: [{...product , quantity:1}]}

      const db=getDb();
    
      return db.collection('users').updateOne(
        {_id:new OnjectId(this._id)},
        {$set:{cart:updatedCart}} 
      )

  }
  
  static findById(userId){ 
    const db=getDb(); 
    
    return db.collection('users')
             .findOne({_id:new ObjectId(userId)}) 
             .then(user=>{
                  return user;
             })
             .catch(err=>console.error(err)); 
  }

}

module.exports = User;
