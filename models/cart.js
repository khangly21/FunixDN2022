const Sequelize = require('sequelize').Sequelize;
//require connection
const sequelize=require('../util/database');
//dùng sequelize trong database.js để kết nối Model class Cart với bảng carts
//định nghĩa Model class Cart , ánh xạ/represent 1 bảng trong CSDL
const Cart=sequelize.define('cart',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,  //vì dòng này nếu để type:Sequelize.STRING sẽ bị báo lỗi?
        allowNull:false,
        primaryKey:true
    }
});

module.exports=Cart;
//but where is the Product?
//keep in mind that a cart 
   ///belong to a single user 
   ///may hold multiple products. 
//carts table should hold the different carts for the different users
//Không chỉ cần Cart model class và carts table, mà còn cần cart-item.js

// So sánh Lưu trữ trong tập tin cart.json với Lưu trữ trong CSDL quan hệ với Entity/Model Cart
   /// cart.json
       //// rõ ràng các đối tượng product có liên quan với nhau , tất cả có chung 1 cart id 
       //// mỗi product hay cart-item có thể được ghi phiếu với thêm các thuộc tính ngày giờ, số lượng  

    /// trong CSDL QH
       //// 2 thực thể Cart và CartItem rõ ràng có Association 2 chiều với nhau
       //// Hành động postAddCartItem có thể lưu thành 1 thực thể với createdAt và updatedAt 







