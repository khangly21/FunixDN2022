//const Sequelize = require('sequelize').Sequelize;
const Sequelize = require('sequelize');

const sequelize = require('../util/database'); //biến này có kiểu dữ liệu Sequelize

const User=sequelize.define('user',{ 

    //second param . Each attribute of the hash / an object represents a column
    id:{
        type: Sequelize.INTEGER,  //Sequelize.IntegerDataTypeConstructor
        autoIncrement:true,
        allowNull:false, 
        primaryKey:true
    },
    name:Sequelize.STRING,  //hover Sequelize2 thấy nó tự import DataTypes, https://stackoverflow.com/questions/39187525/when-defining-a-model-should-i-use-sequelize-or-datatype
    email:Sequelize.STRING
});

module.exports=User;
