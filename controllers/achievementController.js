const { Achievement } = require('../models');

class AchievementController {
  static async findAchievements(req, res, next) {
    try {
      const { id } = req.userLogged;

      const data = await Achievement.findAll({
        where: { user_id: id },
        order: [['date', 'ASC']]
      });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async findAchievement(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { achievementId } = req.params;

      const data = await Achievement.findOne({
        where: { id: achievementId, user_id: id },
      });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async createAchievement(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { title, issuer, date, description } = req.body;

      const data = await Achievement.create({
        user_id: id,
        title,
        issuer,
        date,
        description,
      });
      res.status(201).json({ ...data.dataValues, message: 'Successfully add achievement!' });
    } catch (error) {
      next(error);
    }
  }

  static async updateAchievement(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { achievementId } = req.params;
      const { title, issuer, date, description } = req.body;

      const findAchievement = await Achievement.findOne({
        where: { id: achievementId, user_id: id },
      });

      if (findAchievement) {
        const data = await Achievement.update(
          {
            title,
            issuer,
            date,
            description,
          },
          {
            where: { id: achievementId, user_id: id },
          }
        );
        res.status(200).json({
          message: 'Successfully update achievement!',
        });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async destroyAchievement(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { achievementId } = req.params;

      const findAchievement = await Achievement.findOne({
        where: { id: achievementId, user_id: id },
      });

      if (findAchievement) {
        const data = await Achievement.destroy({ where: { id: achievementId, user_id: id } });
        res.status(200).json({ message: 'Successfully delete achievement!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AchievementController;
