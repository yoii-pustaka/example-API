const model = require('../../config/database/Model');

const controller = {};

controller.getArticle = async (req, res) => {
    try {
        const articles = await model.Article.findAll({
            include: model.Category
        });
        res.json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

controller.postArticle = async (req, res) => {
    try {
        const { title, summary, content, category_id } = req.body;
        if (!title || !summary || !content || !category_id) {
            return res.status(400).json({ error: 'Missing Input Data' });
        }
        const newArticle = await model.Article.create({
            title: title,
            summary: summary,
            content: content,
            category_id: category_id,
        },
            {
                include: model.Category
            });
        res.status(201).json({ message: 'Article created successfully', article: newArticle });
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

controller.getArticleById = async (req, res) => {
    try {
        const articleId = req.params.id;
        const article = await model.Article.findByPk(articleId, {
            include: model.Category
        });
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        console.error('Error fetching article by id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

controller.deleteArticleyById = async (req, res) => {
    const articleId = req.params.id;
    try {
        if (!articleId) res.status(404).json("Not Found")
        const category = await model.Article.destroy({
            where: {
                id: articleId
            },
            include: model.Category
        });
        if (!category) res.json("Delete Failure");
        res.status(200).json({ message: "Succes Delete Data" })
    } catch (error) {
        console.error('Error fetching category by id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

controller.editArticleById = async (req, res) => {
    const articleId = req.params.id;
    const { title, summary, content, category_id } = req.body;
    if (!title || !summary || !content || !category_id) {
        return res.status(400).json({ error: 'Missing Input Data' });
    }
    try {
        const [updated] = await model.Article.update(
            {
                title,
                summary,
                content,
                category_id
            },
            {
                where: { id: articleId },
                include: [model.Category]
            }
        );
        if (!updated) {
            return res.status(404).json({ error: "Update Data Failure" });
        }
        const updatedArticle = await model.Article.findByPk(articleId, {
            include: [model.Category]
        });
        return res.status(200).json({ message: "Update Success", article: updatedArticle });
    } catch (error) {
        console.error('Error updating article:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = controller;
