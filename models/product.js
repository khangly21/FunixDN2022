const mongoConnect=require("../util/database").mongoConnect;

// I want to create a new class again because I'll create my own model instance again and this is something we did before already in the pure MySQL

//Note: keywords `class` and `constructor`
//Side note: The overwhelming convention in JavaScript is that constructor functions (functions you call via new) start with a capital letter. So A rather than a
//Note: this. is never optional in JavaScript as it is in Java or C#
class Product{
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
    //https://stackoverflow.com/questions/2374269/what-does-this-do-in-a-constructor
    //https://stackoverflow.com/questions/47957741/reactjs-bindthis
    //trong Java thì không ghi constructor() mà ghi là Product( kieu_du_lieu ten_thuoc_tinh)
    //trong Javascript thì người dạy gọi class là synonym với constructor

    //constructor Product(title,price,description,imageUrl) sẽ tường minh hơn chỉ ghi keyword constructor ??
    //There can only be one special method with the name "constructor" in a class
    constructor(title,price,description,imageUrl){ // new operator với Product( , , , ) sẽ gọi constructor Product(4 tham số) và tạo ra thực thể kế thừa (inheritance) các thuộc tính và hàm của class
        //store product information when it gets created, gọi "this" = Product , internally inside a constructor nên dùng this
        this.title=title; //hover title thì đó chính là Product.title, nhưng Product ở đây không phải class mà là type của instance được tạo ra từ việc dùng toán tử new với kích hoạt hàm constructor.
        //Important: this.title với this tham chiếu tới instance chứ không phải trỏ tới class Product, cho thấy Inheritance của instance có title của lớp 
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        //với các this trỏ vào Product instance, Now we can create a new product (instance) in javascript. a new object which follows this form
    }
    
    //now to save it in the database, I will also add a save method here
    //save(
      //connect to mongodb and save my product, to be able to connect, I'll need to import mongodb or mongo connect
      //Nhược điểm: However if we would do this, we would have to connect to mongodb for every operation we do and we would not even disconnect thereafter (sau đó)
      //Solution:So it would be better if we could manage one connection in our database and then simply return access to the client which we set up once from there or to the different place in our app that need access.
          ///next lecture  Lab6.3

    //)
}


module.exports=Product; //Product này là class, chứ không phải constructor , Do đó tên gọi của nó viết hoa chữ cái đầu tiên, các module khác được thì người dạy gọi là "import class or constructor" , có thể vì code khác
//Kết luận: class và constructor đầu là hàm, khác ở chỗ class được export và import. Còn constructor là nơi lưu data của instance, các method của class được bind(instance) nên trong method có thể gọi this. Các instance mới sẽ kế thừa class các nonstatic members (nonstatic datas and nonstatic methods) nên tự nó có thể gọi thực hiện các non-static method, còn các static method chỉ có thể được gọi bởi class
//class được dùng để gọi static method



