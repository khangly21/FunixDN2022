
const express = require('express');

var path=require('path');

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

const getDb=require('./util/MongoDB_without_ODM').getDb;


const bodyParser = require('body-parser');

//Model class
const Dog=require('./models/dog');


//mongoose
const connectedMongoose = require('./util/connnectedMongoose').connectedMongoose;
const db=require('./util/connnectedMongoose').dbMongoose_connection;

//seeding first records to Mongodb
const seeds = require('./controllers/seedMongodb').createData;
const findAllDog=require('./controllers/dogHolder').findAllDog_query;
const findAllDog_gt_5=require('./controllers/dogHolder').findAllDog_older_than_5_query;

//import ejs-blocks module
const ejsBlock = require('ejs-blocks');

//Routes
const shopRoutes = require('./routes/shop');
const staffRoutes = require('./routes/staff');

const app=express();


//điều kiện tiên quyết cho form POST req
app.use(bodyParser.urlencoded({ extended: false }));

//view engine
app.engine('ejs', ejsBlock);
app.set('view engine', 'ejs'); // set the view engine to ejs


function TheFirstDoor(req,res,next){
    Dog.findById('62d5c0ec6b2caf435f14e55a')
    .exec() 
    .then(user =>{
        
        if(user){
            console.log("i found that user !!!")
            req.user = user;
           
        }else{
            console.log("I cannot find that userId")
        }
        next();
    })
    .catch(err => console.log(err));
}

app.use('/admin',TheFirstDoor,shopRoutes);
app.use('/staff',TheFirstDoor,staffRoutes);


if(connectedMongoose){
   
    db.on('open',()=>{
        
       
        const Dog=require('./models/dog');

       
        Dog.findOne().then(dog=>{ 
            if(!dog){  
                seeds().then(result=>{
                    console.log("ok I seed your Seeding database with dogs array!");
                })

            }
        })

  
      
        app.listen(4000,()=>{
            console.log("App is listening at port");
            console.log("Trong lab7.17_cach2 thì mongoose được tải về 4 lần trong app.js và 3 models. Nên tái sử dụng 1 connectedMongoose thôi")
        })
    })
}else{
    db.on("error", (err) => {
        console.log(err);
      })
      .on("close", () => {
        console.log(`You are no longer connected to Mongo`);
      });
}
