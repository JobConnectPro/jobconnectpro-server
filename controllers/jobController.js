const { Job, Category, Company, Sector, sequelize } = require('../models');
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

      const limit = +req.query.limit || 10;
      const page = +req.query.page || 1;
      const offset = (page - 1) * limit;

      const {count, rows} = await Job.findAndCountAll({
        where,
        limit,
        offset,
        order : [['createdAt', 'DESC']],
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
      res.status(200).json({
        totalItems : count,
        data : rows,
        currentPage : page,
        totalPages : Math.ceil(count/limit)
      });
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
    const t = await sequelize.transaction();
    try {
      const userId = req.userLogged.id;
      const { title, company_id, description, categories, requirement, job_level, minimum_salary, maximum_salary, type, location, starting_date, minimum_experience , status } = req.body;
  
      const company = await Company.findOne({
        where: { id: company_id}
        
      });
      if (!company) {
        return res.status(404).json({ message: 'Company not found!' });
      }
  
      if (!categories || categories.length === 0) {
        return res.status(400).json({message: 'Categories must be provided!' });
      }
  
      const categoriesInstance = await Category.findAll({
        where: { category: categories },
      }, { transaction: t });
  
      if (!categoriesInstance || categoriesInstance.length === 0) {
        return res.status(400).json({
          message: 'Category Not Found'
        })
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
        status
      }, { transaction: t });
  
      await job.addJobCategories(categoriesInstance, { transaction: t });
  
      await t.commit();
  
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
      await t.rollback();
      next(error);
    }
  }
  


  static async updateJob(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.userLogged;
      const { jobId } = req.params;
      const { title, company_id, description, categories, requirement, job_level, minimum_salary, maximum_salary, type, location, starting_date, minimum_experience, status } = req.body;
  
      const job = await Job.findOne({ where: { id: jobId, user_id: id } });
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found!' });
      }
  
      if (company_id) {
        const company = await Company.findOne({ where: { id: company_id } });
  
        if (!company) {
          return res.status(404).json({ message: 'Company not found!' });
        }
  
        await job.update({ company_id: company.id }, { transaction: t });
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
        status
      }, { transaction: t });
  
      if (!categories || categories.length === 0) {
        return res.status(400).json({message: 'Categories must be provided!' });
      }
  
      const categoriesInstance = await Category.findAll({
        where: { category: categories },
      }, { transaction: t });
  
      if (!categoriesInstance || categoriesInstance.length === 0) {
        throw { name: 'ErrorNotFound' };
      }
  
      await updatedJob.setJobCategories(categoriesInstance, { transaction: t });
  
      await t.commit();
  
      res.status(200).json({
        message: 'Successfully update job!',
        updatedData: updatedJob,
      });
    } catch (error) {
      await t.rollback();
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



