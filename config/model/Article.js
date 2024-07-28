const { DataTypes } = require('sequelize');
const sequelize = require('../database/config'); // Pastikan path konfigurasi sesuai dengan struktur proyek Anda
const Category = require('./Category'); // Pastikan path Category.js sesuai dengan struktur proyek Anda

const Article = sequelize.define('article', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'category',
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});



module.exports = Article;
