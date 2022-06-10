//constructor functions
/*
    //ES5
    module.exports=function Product(){

    }
*/
//you call that to create new objects

const products=[]; //we will change this later when we use a real database

//ES6 Javascript
module.exports=class Product{
    //in this class, I want to define the shape of a product
    constructor(t){
        //properties, basically variables
        this.title=t; //store t inside object
    }

    //without the "function" keyword
    save(){
        //I wanna store product into array products
        products.push(this); //this will refer to the object created based on the class and that is exactly the object I want to store in this array
    }

    //obviously I also want to be able to retrieve all products from that array
    // to do that through my product model
    //utility function
    static fetchAll(){
        //is not called on a single instance of the product because it should fetch all products
        //I don't wanna call "new" object just for fetch all products , therefore I add "static" keyword 
           ///makes sure that I can call this method directly on the class itself and not on an instantiated object with "new" keyword
        return products;  //this.products sẽ incorrect, because we are returning this array, not some local property of this class
    }
}

//this allows me to then create an object based on this class where I can pass the title to the constructor, with the "new" keyword 

