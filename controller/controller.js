const articleController = require("./controller/article");
const categoryController = require("./controller/category");

const controller = {
  // Category Controller
  getCategory: categoryController.getCategory,
  getCategoryById: categoryController.getCategoryById,
  postCategory: categoryController.postCategory,
  editArticleById: articleController.editArticleById,
  deleteArticleById: articleController.deleteArticleyById,

  // Article Controller
  getArticle: articleController.getArticle,
  getArticleId: articleController.getArticleById,
  postArticle: articleController.postArticle,
  editCategoryById: categoryController.editCategoryById,
  deleteCategoryById: categoryController.deleteCategoryById,
};

module.exports = controller;


