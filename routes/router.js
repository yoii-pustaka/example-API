const express = require('express');
const controller = require('../controller/controller');

const router = express.Router();

// Article Router
router.get('/api/article', controller.getArticle);
router.get('/api/article/:id', controller.getArticleId);
router.post('/api/article', controller.postArticle);
router.patch('/api/article/:id', controller.editArticleById);
router.delete('/api/article/:id', controller.deleteArticleById);

// Category Router
router.get('/api/category', controller.getCategory);
router.get('/api/category/:id', controller.getCategoryById);
router.post('/api/category', controller.postCategory);
router.patch('/api/category/:id', controller.editCategoryById);
router.delete('/api/category/:id', controller.deleteCategoryById);

module.exports = router;
