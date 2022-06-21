const Sequelize = require('sequelize').Sequelize;
//require connection
const sequelize=require('../util/database');


//the order essentially is like the cart, vì nó là bước checkout của cart
const Order=sequelize.define('order',{
    //thông tin lưu trữ của OrderItem; will not have anything but the ID because the order essentially is like the cart here for me.

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }

    //có thể thêm thông tin như address, nhưng chỉ mình id là essentially rồi
});

module.exports=CartItem;

