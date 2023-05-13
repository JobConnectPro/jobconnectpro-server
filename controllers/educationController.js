const { Education, Attainment } = require('../models');

class EducationController {
  static async findEducations(req, res, next) {
    try {
      const { id } = req.userLogged;

      const data = await Education.findAll({
        where: { user_id: id },
        include: [{ model: Attainment }],
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

  static async findEducation(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { educationId } = req.params;

      const data = await Education.findOne({
        where: {
          id: educationId,
          user_id: id,
        },
        include: [
          {
            model: Attainment,
          },
        ],
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
  static async createEducation(req, res, next) {
    try {
      const { id } = req.userLogged;
      const {
        attainment_id,
        school,
        major,
        description,
        start_date,
        end_date,
      } = req.body;

      const data = await Education.create({
        user_id: id,
        attainment_id,
        school,
        major,
        description,
        start_date,
        end_date,
      });
      res
        .status(201)
        .json({
          ...data.dataValues,
          message: 'Successfully create education!',
        });
    } catch (error) {
      next(error);
    }
  }

  static async updateEducation(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { educationId } = req.params;
      const {
        attainment_id,
        school,
        major,
        description,
        start_date,
        end_date,
      } = req.body;

      const findEducation = await Education.findOne({
        where: { id: educationId, user_id: id },
      });

      if (findEducation) {
        const data = await Education.update(
          {
            attainment_id,
            school,
            major,
            description,
            start_date,
            end_date,
          },
          {
            where: {
              id: educationId,
              user_id: id,
            },
          }
        );
        res.status(200).json({ message: 'Successfully update education!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async destroyEducation(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { educationId } = req.params;

      const findEducation = await Education.findOne({
        where: { id: educationId, user_id: id },
      });

      if (findEducation) {
        const data = await Education.destroy({
          where: {
            id: educationId,
            user_id: id,
          },
        });
        res.status(200).json({ message: 'Successfully delete education!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = EducationController;
