const connectedMongoose = require('../util/connnectedMongoose').connectedMongoose;

const {Schema, model}=connectedMongoose;

const recordedAttendance =new Schema(
    {   
        name:String, 
           
        work_location:String,
        checkout:{
            type:String,
            required:false
        }
    }, 
    {timestamps: { createdAt: true, updatedAt: true }} 
)

const Attendance = model('attendanceDiary', recordedAttendance);

module.exports=Attendance;