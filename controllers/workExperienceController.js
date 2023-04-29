const { WorkExperience } = require('../models');

class WorkExperienceController {
  static async findWorkExperiences(req, res, next) {
    try {
      const { id } = req.userLogged;

      const data = await WorkExperience.findAll({
        where: { user_id: id },
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

  static async findWorkExperience(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { workExperienceId } = req.params;

      const data = await WorkExperience.findOne({
        where: { id: workExperienceId, user_id: id },
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

  static async createWorkExperience(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { job_title, company, start_date, end_date, description, job_level, salary, salary_frequency } = req.body;

      const data = await WorkExperience.create({
        user_id: id,
        job_title,
        company,
        start_date,
        end_date,
        description,
        job_level,
        salary,
        salary_frequency,
      });
      res.status(201).json({ ...data.dataValues, message: 'Successfully add work experience!' });
    } catch (error) {
      next(error);
    }
  }

  static async updateWorkExperience(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { workExperienceId } = req.params;
      const { job_title, company, start_date, end_date, description, job_level, salary, salary_frequency } = req.body;

      const findWorkExperience = await WorkExperience.findOne({
        where: { id: workExperienceId, user_id: id },
      });

      if (findWorkExperience) {
        const data = await WorkExperience.update(
          {
            job_title,
            company,
            start_date,
            end_date,
            description,
            job_level,
            salary,
            salary_frequency,
          },
          { where: { id: workExperienceId, user_id: id } }
        );
        res.status(201).json({
          message: 'Successfully update work experience!',
        });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async destroyWorkExperience(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { workExperienceId } = req.params;

      const findWorkExperience = await WorkExperience.findOne({
        where: { id: workExperienceId, user_id: id },
      });

      if (findWorkExperience) {
        const data = await WorkExperience.destroy({ where: { id: workExperienceId, user_id: id } });
        res.status(200).json({ message: 'Successfully delete work experience!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WorkExperienceController;
