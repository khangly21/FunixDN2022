//Working with File System
const fs= require('fs');
//file should then also be created in special path, so I will use the path tool
//path module to construct a path that works on all operating systems.
const path= require('path');

//ES6 Javascript
module.exports=class Product{
    //in this class, I want to define the shape of a product
    constructor(t){
        //properties, basically variables
        this.title=t; //store t inside object
    }

    //without the "function" keyword

    //Khi nào hàm save() được gọi? Khi ấn nút submit product từ form
    save(){
        //join: my root directory NJS101x + "data" folder where I want to store my file + "products.json" to store my data in json format.
        //đặt path p
        const p=path.join(path.dirname(require.main.filename),'data','products.json');
        //to store a new product in there, first of all I need to get the existing array of products, so first to read the entire content of the file 
            /// fs.readFile() dành cho file nhỏ
        //Vấn đề space trong đọc file: for very big files, there are more efficient ways because you don't want to read them all into memory before you work with them
           /// you can create a read stream with this function but we can read the entire file here
           /// fs.createReadStream() 
        
        //đọc async toàn bộ nội dung file, sẽ có hàm callback bên cạnh khi done read it
        fs.readFile(p,(err,fileContent)=>{
            //log the file content nhưng file phải exists
            //console.log(fileContent);
            //chú ý nếu file products.json chưa tồn tại thì báo lỗi No such file 
            // err sẽ null nếu không có error. Nhưng nếu có error. if we have one then I simply want to create a new empty array because we have no existing products.json 

            let products=[]; //initially this is an empty array and I will actually keep it as such if we do have an error
            //if no err: 
            // if(null)
            if(!err){
                //read the products from the file
                // store it in json format
                //the parse method which takes incoming json and gives us back a javascript array or object or whatever is in the file.
                //update
                products=JSON.parse(fileContent);

            }
            //now I know products will be an array of products 
            // push to array, either to the new one products=[];  or the one I read from the file
            products.push(this); //Now important, to ensure that this refers to the class,you should use an arrow function here because otherwise "this" will lose its context and will not refer to the class anymore. Đây cũng là cơ sở lý luận của React
            //save back to the file , I will write it to the same path as where I read it from
            //JSON hóa javascript object (trường hợp này là mảng products) rồi ghi vào file json  
            //May I get an err? just use a callback
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            });
        });
        

    }

    //obviously I also want to be able to retrieve all products from that array
    // to do that through my product model
    //utility function
    static fetchAll(){
        //is not called on a single instance of the product because it should fetch all products
        //I don't wanna call "new" object just for fetch all products , therefore I add "static" keyword 
           ///makes sure that I can call this method directly on the class itself and not on an instantiated object with "new" keyword
        const p=path.join(path.dirname(require.main.filename),'data','products.json');
        fs.readFile(p,(err,fileContent)=>{ //p is the path that is defined in the save() method
            if(err){
                return [];//I always want to return an array because that is what fetch all expects but it should at least be empty
            }
            return JSON.parse(fileContent);
            //Như vậy trong cả 2 TH có err và không err có fileContent, tui đều trả về dữ liệu
            //but keep in mind that this is asynchronous code.
            
        })
    }
};

//this allows me to then create an object based on this class where I can pass the title to the constructor, with the "new" keyword 

