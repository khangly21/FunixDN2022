const Dog = require("../models/dog");

const findAllDog_query=async ()=>{
    const results=await Dog.find({})  
    console.log('Kết quả async/await function để tìm tất cả dogs: \n',results);
}

exports.findAllDog_query_and_render = (req, res, next) => {
  
    if((req.query.DogName) && (req.query.DogAge) ){  
      console.log("here")
      const DogName=req.query.DogName;
      const DogAge=req.query.DogAge;
 
      const DOG=new Dog({
          name:DogName,
          age:DogAge
      })
 
      DOG.save()
         .then(result=>{
            return Dog.find({}) 
         })
         .then(dogs=>{
              if(dogs){
                console.log("có form, TRƯỚC khi render ra admin/index")
                res.render('admin/index', {  
                  dogs: dogs,
                 
                  title: `Có ${dogs.length} loại chó`,
                  path: '/admin/findAllDog'
                 });
                 console.log("có form, SAU khi render ra admin/index") 
              }
              
         })
    }else{
         Dog.find({})
          .then(dogs=>{
              console.log(Array.isArray(dogs))//true
   
               console.log("no form, TRƯỚC khi render ra admin/index")
               res.render('admin/index', {  
                      dogs: dogs,
                      title: `Có ${dogs.length} loại chó`,
                      path: '/admin/findAllDog'
                  });
               console.log("no form, SAU khi render ra admin/index")
          })
    }

};


const findAllDog_older_than_5_query=async ()=>{
    const results=await Dog.find({age: {$gt: 5}})   
    console.log(results);
}

exports.findAllDog_query=findAllDog_query;
exports.findAllDog_older_than_5_query=findAllDog_older_than_5_query;