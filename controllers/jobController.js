const { Job, Category, Company, Sector } = require('../models');
const { Op } = require('sequelize');

class JobController {
  static async findJobs(req, res, next) {
    try {
      const { title, type, location, minimum_experience } = req.query;
      const where = {};

      if (title) {
        where.title = { [Op.iLike]: `%${title}%` };
      }
      if (type) {
        where.type = { [Op.iLike]: `%${type}%` };
      }
      if (location) {
        where.location = { [Op.iLike]: `%${location}%` };
      }
      if (minimum_experience) {
        where.minimum_experience = { [Op.lte]: minimum_experience };
      }

      const limit = req.query.limit || 10;
      const page = req.query.page || 1;
      const offset = (page - 1) * limit;

      const data = await Job.findAll({
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: Company,
            include: [{ model: Sector }],
          },
          {
            model: Category,
            as: 'JobCategories',
          },
        ],
      });
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async findJob(req, res, next) {
    try {
      const { jobId } = req.params;
      const data = await Job.findOne({
        where: {
          id: jobId,
        },
        include: [
          {
            model: Company,
            include: [{ model: Sector }],
          },
          {
            model: Category,
            as: 'JobCategories',
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

  static async createJob(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const {
        title,
        description,
        categories,
        requirement,
        job_level,
        minimum_salary,
        maximum_salary,
        type,
        location,
        starting_date,
        minimum_experience,
      } = req.body;

      const company = await Company.findOne({
        where: { user_id: userId },
      });

      if (!company) {
        return res.status(404).json({ message: 'Company not found!' });
      }

      const job = await Job.create({
        user_id: userId,
        company_id: company.id,
        title,
        description,
        requirement,
        job_level,
        minimum_salary,
        maximum_salary,
        type,
        location,
        starting_date,
        minimum_experience,
      });

      if (categories && categories.length > 0) {
        const categoriesInstance = await Category.findAll({
          where: { category: categories },
        });

        if (!categoriesInstance || categoriesInstance.length === 0) {
          throw { name: 'ErrorNotFound' };
        }

        await job.addJobCategories(categoriesInstance);
      }

      res.status(201).json({
        message: 'Successfully create job!',
        fullField: {
          data: job,
          company: {
            companyName: company.company_name,
          },
          category: {
            categoryName: categories,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateJob(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { jobId } = req.params;
      const {
        title,
        description,
        categories,
        requirement,
        job_level,
        minimum_salary,
        maximum_salary,
        type,
        location,
        starting_date,
        minimum_experience,
      } = req.body;

      const job = await Job.findOne({ where: { id: jobId, user_id: id } });

      if (!job) {
        return res.status(404).json({ message: 'Job not found!' });
      }

      const updatedJob = await job.update({
        title,
        description,
        requirement,
        job_level,
        minimum_salary,
        maximum_salary,
        type,
        location,
        starting_date,
        minimum_experience,
      });

      if (categories && categories.length > 0) {
        const categoriesInstance = await Category.findAll({
          where: { category: categories },
        });

        await updatedJob.setJobCategories(categoriesInstance);
      } else {
        await updatedJob.setJobCategories([]);
      }

      res.status(200).json({
        message: 'Successfully update job!',
        updatedData: updatedJob,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyJob(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { jobId } = req.params;

      const job = await Job.findOne({ where: { id: jobId, user_id: id } });

      if (job) {
        await job.destroy();
        res.status(200).json({ message: 'Successfully delete job!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = JobController;
