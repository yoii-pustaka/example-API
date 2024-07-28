const Article = require("../model/Article");
const Category = require("../model/Category");

Category.hasMany(Article, { onDelete: 'CASCADE' });

Article.belongsTo(Category, {
    foreignKey: 'category_id'
});

const model = {
    Category: Category,
    Article: Article
};

module.exports = model;
