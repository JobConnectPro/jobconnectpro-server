const { Category } = require('../models');
const { Op } = require('sequelize');

class CategoryController {
  static async findCategories(req, res, next) {
    try {
      const data = await Category.findAll({order: [['category', 'ASC']]});

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async findCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const data = await Category.findOne({ where: { id: categoryId } });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { category } = req.body;
      const uniqueCategory = await Category.findOne({ where: { category } });

      if (!uniqueCategory) {
        const data = await Category.create({ category });
        res.status(201).json({ ...data.dataValues, message: 'Successfully create category!' });
      } else {
        throw { name: 'ValidationFailed' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const { category } = req.body;

      const findCategory = await Category.findOne({ where: { id: categoryId } });

      if (findCategory) {
        const data = await Category.update({ category }, { where: { id: categoryId } });
        res.status(200).json({ message: 'Successfully update category!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async destroyCategory(req, res, next) {
    try {
      const { categoryId } = req.params;

      const findCategory = await Category.findOne({ where: { id: categoryId } });

      if (findCategory) {
        const data = await Category.destroy({ where: { id: categoryId } });
        res.status(200).json({ message: 'Successfully delete category!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async searchCategories(req, res, next) {
    const { q } = req.query;
    try {
      const categories = await Category.findAll({
        where: {
          category: {
            [Op.iLike]: `%${q}%`,
          },
        },
      });
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
