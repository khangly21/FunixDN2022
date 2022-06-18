//const Sequelize = require('sequelize');
const Sequelize = require('sequelize').Sequelize

const sequelize=new Sequelize('first_node_schema','root','Khangphongvu29@',{
  dialect:'mysql',
  host:'localhost'
});

module.exports = sequelize;
