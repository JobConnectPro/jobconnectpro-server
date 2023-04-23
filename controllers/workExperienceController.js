const { WorkExperience } = require("../models");

class WorkExperienceController {
  static findAll = async (req, res, next) => {
    try {
      const data = await WorkExperience.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  static findOne = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await WorkExperience.findOne({ where: { id } });
      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: "data not found" };
      }
    } catch (err) {
      next(err);
    }
  };

  static create = async (req, res, next) => {
    try {
      const { user_id, job_title, company, start_date, end_date, description, job_level, salary, salary_frequency } =
        req.body;
      const data = await WorkExperience.create({
        user_id,
        job_title,
        company,
        start_date,
        end_date,
        description,
        job_level,
        salary,
        salary_frequency,
      });
      res.status(201).json({ message: "New Work Experience created succesfully" });
    } catch (err) {
      next(err);
    }
  };

  static update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { user_id, job_title, company, start_date, end_date, description, job_level, salary, salary_frequency } =
        req.body;
      const data = await WorkExperience.update(
        { user_id, job_title, company, start_date, end_date, description, job_level, salary, salary_frequency },
        { where: { id } }
      );
      if (data === 0) {
        throw { name: "not found" };
      } else {
        res.status(200).json({ message: `Work Experience with id ${id} successfully updated` });
      }
    } catch (err) {
      next(err);
    }
  };

  static destroy = async (req, res, next) => {
    try {
      const { id } = req.params;
      await WorkExperience.destroy({ where: { id } });
      res.status(200).json({ message: `Work Experience with id ${id} success deleted` });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = WorkExperienceController;
