
const mongodb = require('mongodb');
const getDb=require('../util/database').getDb;

class Product{
  
    constructor(title,price,description,imageUrl,id,userId){  //không liên quan product doc trên MongoDB là (_id,title,price,description,imageUrl)
        this.title=title; 
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        
        this._id=id ? new mongodb.ObjectId(id) : null  
        this.userId=userId;  // Association 
    }
    
    save(){
        const db=getDb(); 
        let dbOp; 
        if(this._id){ 
            dbOp=db.collection('products')
                   
                   .updateOne({_id:this._id}, {$set: this}); 
        }else{ 
            dbOp=db.collection('products')
                   .insertOne(this);
        }
        
        return  dbOp
                .then(result=>{
                    console.log("Kết quả từ database operation (insertOne hoặc updateOne) : \n",result) 
                })
                .catch(err=> console.log(err)); 
    }

    static deleteById(prodId){
        
        const db=getDb();
       
        return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)})
                                 .then(result=>{
                                     console.log('DELETED successfully')
                                 })
                                 .catch(err=>{
                                     console.log(err);
                                 })
    }

    static fetchAll(){
       
        const db=getDb();
        return db
            .collection('products')
            .find()
            .toArray()
            .then(products=>{
                //console.log("Mảng products thu được là: \n",products);
                //console.log("truy cập dữ liệu của người thứ nhất: \n",products[0]);
                return products; 
            })
            .catch(err=>console.log(err));
        
    } 

    static findById(prodId){
        const db=getDb();
       

        return db
          .collection('products') 
          .find({_id:new mongodb.ObjectId(prodId)}) 
          .next()
          .then(product=>{
              if(product){ 
                  console.log("product tìm ra từ collection products có _id = prodId",product); 
                  return product; 
              }
        
          })
          .catch(err=>{
             console.log(err);
            
          })
    }
}


module.exports=Product; 



