const { Achievement } = require('../models');

class AchievementController {
  static async get(req, res) {
    try {
      const data = await Achievement.findAll();
      res.status(200).json(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await Achievement.findOne({
        where: {
          id: +id,
        },
      });

      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: 'Achievement not found!' });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  static async create(req, res) {
    try {
      const { user_id, title, issuer, date, description } = req.body;
      const data = await Achievement.create({
        user_id,
        title,
        issuer,
        date,
        description,
      });
      res.status(201).json(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;
  }
}

module.exports = AchievementController;
