const Sequelize = require('sequelize').Sequelize;
//require connection
const sequelize=require('../util/database');

//cấu trúc Class OrderItem sẽ giống như CartItem , vì nó là bước tiếp theo của cartitem
const OrderItem=sequelize.define('orderItem',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    quantity:Sequelize.INTEGER
    
});

module.exports=OrderItem;

