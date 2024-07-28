const { DataTypes } = require('sequelize');
const sequelize = require('../database/config'); 


const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    freezeTableName: true
});

module.exports = Category;
