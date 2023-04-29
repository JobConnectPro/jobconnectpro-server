const { Attainment } = require('../models');

class AttainmentController {
  static async findAttainments(req, res, next) {
    try {
      const data = await Attainment.findAll();

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async findAttainment(req, res, next) {
    try {
      const { attainmentId } = req.params;
      const data = await Attainment.findOne({ where: { id: attainmentId } });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async createAttainment(req, res, next) {
    try {
      const { attainment } = req.body;
      const uniqueAttainment = await Attainment.findOne({ where: { attainment } });

      if (!uniqueAttainment) {
        const data = await Attainment.create({ attainment });
        res.status(201).json({ ...data.dataValues, message: 'Successfully create attainment!' });
      } else {
        throw { name: 'ValidationFailed' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateAttaiment(req, res, next) {
    try {
      const { attainmentId } = req.params;
      const { attainment } = req.body;

      const findAttainment = await Attainment.findOne({ where: { id: attainmentId } });

      if (findAttainment) {
        const data = await Attainment.update(
          {
            attainment,
          },
          { where: { id: attainmentId } }
        );
        res.status(201).json({ message: 'Successfully update attainment!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async destroyAttainment(req, res, next) {
    try {
      const { attainmentId } = req.params;

      const findAttainment = await Attainment.findOne({ where: { id: attainmentId } });

      if (findAttainment) {
        const data = await Attainment.destroy({
          where: {
            id: attainmentId,
          },
        });
        res.status(200).json({ message: 'Successfully delete Attainment!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AttainmentController;
