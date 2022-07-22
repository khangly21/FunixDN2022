
const connectedMongoose = require('../util/connnectedMongoose').connectedMongoose;

const {Schema, model}=connectedMongoose;

const DogSchema =new Schema(
    {   
        name:String,
       
        doB:{
            type:Date,
            required:true,
            trim:true
        },
        startDate:Date,
        salaryScale:Number,
        age:Number,
        annualLeave:{
            type:Number,
            min:0  
        },
        department:String,
        imageUrl:String,
        ngaynghiphepnamdangky:{
            type:Number,
            required:false,
            default:0
        }
    }, 
    {timestamps: { createdAt: true, updatedAt: true }} 
   
)

const Dog = model('dog', DogSchema)

module.exports =  Dog 