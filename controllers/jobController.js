
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
        where.minimum_experience = { [Op.gte]: minimum_experience };
      }
  
      const data = await Job.findAll({
        where,
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
  const { title, description, categories, requirement, job_level, minimum_salary, maximum_salary, type, location, starting_date, minimum_experience } = req.body;

  const userId = req.userLogged.id;

  try {
    const company = await Company.findOne({
      where: { user_id: userId },
    });

    if (!company) {
      return res.status(404).json({ message: 'Company Not Found' });
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
      message: 'Job Created',
      fullField: {
        data: job,
        company: {
          companyName: company.company_name,
        },
        category: {
          categoryName : categories
        }
      },
    });
  } catch (error) {
    next(error)
  }
}

static async updateJob(req, res, next) {
  try {
    const { jobId } = req.params;
    const { title, description, categories, requirement, job_level, minimum_salary, maximum_salary, type, location, starting_date, minimum_experience } = req.body;

    const job = await Job.findByPk(jobId);
    
    if (!job) {
      return res.status(404).send('Job not found');
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
      message: 'Updated Successfully',
      updatedData: updatedJob,
    });
  } catch (error) {
    next()
  }
}

  static async destroyJob(req, res) {
    const { jobId } = req.params;
    try {
      const job = await Job.findByPk(jobId);
      if (job) {
        await job.destroy();
        res.status(200).json({ message: 'Succesfuly Deleted' });
      } else {
        res.status(404).send('Job not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = JobController;
