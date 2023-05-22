const { Training } = require('../models');

class TrainingController {
  static async findTrainings(req, res, next) {
    try {
      const { id } = req.userLogged;

      const data = await Training.findAll({
        where: { user_id: id },
        order: [['start_date', 'ASC']],
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

  static async findTraining(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { trainingId } = req.params;

      const data = await Training.findOne({
        where: { id: trainingId, user_id: id },
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

  static async createTraining(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { title, organizer, start_date, end_date } = req.body;

      const data = await Training.create({
        user_id: id,
        title,
        organizer,
        start_date,
        end_date,
      });
      res.status(201).json({ ...data.dataValues, message: 'Successfully add training!' });
    } catch (error) {
      next(error);
    }
  }

  static async updateTraining(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { trainingId } = req.params;
      const { title, organizer, start_date, end_date } = req.body;

      const findTraining = await Training.findOne({
        where: { id: trainingId, user_id: id },
      });

      if (findTraining) {
        const data = await Training.update(
          {
            title,
            organizer,
            start_date,
            end_date,
          },
          {
            where: { id: trainingId, user_id: id },
          }
        );
        res.status(200).json({
          message: 'Successfully update training!',
        });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async destroyTraining(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { trainingId } = req.params;

      const findTraining = await Training.findOne({
        where: { id: trainingId, user_id: id },
      });

      if (findTraining) {
        const data = await Training.destroy({ where: { id: trainingId, user_id: id } });
        res.status(200).json({ message: 'Successfully delete training!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TrainingController;
