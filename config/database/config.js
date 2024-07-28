const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('lpage', 'root', '' ,{
    host: 'localhost',
    dialect: 'mysql',
    define:{
        underscored: true
    }
});



module.exports = sequelize;