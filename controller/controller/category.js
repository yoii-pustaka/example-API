const model = require('../../config/database/Model');

const controller = {};

controller.getCategory = async (req, res) => {
    try {
        const categories = await model.Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

controller.postCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const newCategory = await model.Category.create({
            name: name
        });
        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

controller.getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await model.Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        console.error('Error fetching category by id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

controller.deleteCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        if (!categoryId) return res.status(404).json("Not Found");

        const rowsDeleted = await model.Category.destroy({
            where: {
                id: categoryId
            },
        });
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: "Delete Failure" });
        }
        res.status(200).json({ message: "Success Delete Data" });
    } catch (error) {
        console.error('Error deleting category by id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

controller.editCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body
    try {
        const [numRowsUpdated, updatedCategories] = await model.Category.update(
            { name: name },
            { where: { id: categoryId } }
        );

        if (numRowsUpdated === 0) {
            return res.status(404).json({ message: 'Category not found or no changes applied' });
        }

        res.status(200).json({ message: 'Update Success', category: updatedCategories });
    } catch (error) {
        console.error('Error updating category by id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = controller;
