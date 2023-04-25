const { Category } = require('../models');
const { Op } = require('sequelize');

class CategoryController {
    static async createCategory(req, res){
        const {category} = req.body

        try {
            const categoryData = await Category.create({category})
            res.status(201).json(categoryData)
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error')
        }
    }

    static async getCategories (req, res){
        try {
          const categories = await Category.findAll();
          res.json(categories);
        } catch (error) {
          console.log(error);
          res.status(500).send('Internal Server Error');
        }
      };
      
    static async getCategoryById(req, res){
        const { id } = req.params;
        try {
          const category = await Category.findByPk(id);
          if (category) {
            res.json(category);
          } else {
            res.status(404).send('Category not found');
          }
        } catch (error) {
          console.log(error);
          res.status(500).send('Internal Server Error');
        }
      };
      
    static async updateCategory(req, res){
        const { id } = req.params;
        const { category } = req.body;
        try {
          const categoryData = await Category.findByPk(id);
          if (category) {
            await category.update({ category });
            res.json(categoryData);
          } else {
            res.status(404).send('Category not found');
          }
        } catch (error) {
          console.log(error);
          res.status(500).send('Internal Server Error');
        }
      };
      
      static async deleteCategory(req, res){
        const { id } = req.params;
        try {
          const category = await Category.findByPk(id);
          if (category) {
            await category.destroy();
            res.json({ message: 'Category deleted successfully' });
          } else {
            res.status(404).send('Category not found');
          }
        } catch (error) {
          console.log(error);
          res.status(500).send('Internal Server Error');
        }
      };
      
      static async searchCategories(req, res){
        const { q } = req.query;
        try {
          const categories = await Category.findAll({
            where: {
              name: {
                [Op.iLike]: `%${q}%`,
              },
            },
          });
          res.json(categories);
        } catch (error) {
          console.log(error);
          res.status(500).send('Internal Server Error');
        }
      };
}

module.exports = CategoryController;
