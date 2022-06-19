const Sequelize = require('sequelize').Sequelize;
//require connection
const sequelize=require('../util/database');
//dùng sequelize trong database.js để kết nối Model class Cart với bảng carts
//định nghĩa Model class Cart , ánh xạ/represent 1 bảng trong CSDL
const CartItem=sequelize.define('cartItem',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    quantity:Sequelize.INTEGER

    //Now the ID of the cart to which this cart-item/product is related doesn't have to be added by us here, because we will again create an association and let sequelize manage
    //Bảng carts sẽ có userId làm cột khóa ngoại, Với quan hệ N-M giữa Cart và Product nên buộc phải thêm an intermediate table gọi là CartItem chứa id của chính product item này và id của cart sẽ được tính tự động theo mối quan hệ N-M 
});

module.exports=CartItem;

//tại sao CartItem cũng là Model class / Entity ?
    /// theo thầy NTHuy thì nó cũng có ghi nhận ngày giờ liên quan vào phiếu riêng, nên sẽ được phân loại thành Entity để vào MySQL được tự động gán createdAt, updatedAt  
