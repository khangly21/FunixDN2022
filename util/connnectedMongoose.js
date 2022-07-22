//dùng ORM mongoose để kết nối tới mongodb
const mongoose = require('mongoose');

//Config Object to Avoid Deprecation Warnings
const config = { useNewUrlParser: true, useUnifiedTopology: true };

//csdl Seeding
const URI='mongodb+srv://lyvietkhang_admin:FLC0EfhTqJHonvsI@khangserver0.w0azxjp.mongodb.net/Seeding?retryWrites=true&w=majority'
mongoose.connect(URI,config);
        
//Store Connection Object
const dbMongoose_connection = mongoose.connection;

//biến normal mongoose thành 'connected' mongoose
mongoose.connect(URI, config)
        .then(result=>{
            console.log("Mongoose Connected Successful");
        })
        .catch(err=>{
            console.log("Error in the Connection");
        })

exports.connectedMongoose=mongoose;
exports.dbMongoose_connection=dbMongoose_connection;