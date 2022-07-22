//Import the model object
const Dog = require("../models/dog");

const dogs = [
    {name: "Sparky", age: 1,annualLeave:29,doB:'2002-12-09',startDate:'2010-12-09',salaryScale:1,department:"Public Relation",imageUrl:"https://tse3.mm.bing.net/th?id=OIP.llDXL9OI6EPzcwEJVRHZKgHaEK&pid=Api"},
    {name: "Spot", age: 2,annualLeave:12,doB:'2002-12-09',startDate:'2010-12-09',salaryScale:1,department:"HR",imageUrl:"https://tse1.mm.bing.net/th?id=OIP.HDdIsuT-sX0nHDlFV1sqdQHaD6&pid=Api"},
    {name: "Rover", age: 3,annualLeave:33,doB:'2002-12-09',startDate:'2010-12-09',salaryScale:1,department:"Medical",imageUrl:"https://tse3.mm.bing.net/th?id=OIP.eXZ_RhYKFWVs5GfONLjhnAHaD5&pid=Api"},
    {name: "Beethoven", age: 4,annualLeave:9,doB:'2002-12-09',startDate:'2010-12-09',salaryScale:1,department:"Directors",imageUrl:"https://tse1.mm.bing.net/th?id=OIP.GP7N4fVLbHzs_Wr0HEVQTAHaE8&pid=Api"},
    {name: "Bud", age: 5,annualLeave:2,doB:'2002-12-09',startDate:'2010-12-09',salaryScale:1,department:"Sales",imageUrl:"https://tse2.mm.bing.net/th?id=OIP.ZkGGGv75q-DxZi-qR1gwygHaD4&pid=Api"},
    {name: "Charlie", age: 6,annualLeave:0,doB:'2002-12-09',startDate:'2010-12-09',salaryScale:1,department:"Accountings",imageUrl:"https://tse3.mm.bing.net/th?id=OIP.a4lMfXQ9X3b1oHTmlSjSagHaE8&pid=Api"},
    {name: "Cuddles", age: 8,annualLeave:12,doB:'2002-12-09',startDate:'2010-12-09',salaryScale:1,department:"Sales",imageUrl:"https://tse4.mm.bing.net/th?id=OIP.dqq1nIz1RS96D_wG4ki_4QHaEM&pid=Api"},
    {name: "Meatball", age: 9,annualLeave:2,doB:'2002-12-09',startDate:'2010-12-09',salaryScale:1,department:"HR",imageUrl:"https://tse1.mm.bing.net/th?id=OIP.8cQQumYAUccIOobgRng5fQHaCm&pid=Api"},
    {name: "Angel", age: 10,annualLeave:0,doB:'2002-12-09',startDate:'2010-12-09',salaryScale:1,department:"Public Relation",imageUrl:"https://tse3.mm.bing.net/th?id=OIP.X5t5XifgS0cr519LauX9OAHaE8&pid=Api"}
]

const createData=async ()=>{
    try{
        const createDogs=await Dog.create(dogs); 
     
    }catch(err){
        console.log(error);
    }
}

exports.createData=createData;
