
const { Job, Category, Company, Sector } = require('../models');

class JobController {
  static async findJobs(req, res, next) {
    try {
      const data = await Job.findAll({
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

  static async createJob(req, res) {
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
      await job.setJobCategories(categoriesInstance); //mengganti addCategories menjadi setJobCategories di karenakan pada relasinya menggunakan as jobCategories
    }

    res.status(201).json({
      message: 'Job Created',
      fullField: {
        data: job,
        company: {
          companyName: company.company_name,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}


  static async updateJob(req, res) {
    const { jobId } = req.params;
    const { company_id, title, description, categories, requirement, job_level, minimum_salary, maximum_salary, type, location, starting_date, minimum_experience } = req.body;
    try {
      const job = await Job.findByPk(jobId);
      if (job) {
        job.company_id = company_id;
        job.title = title;
        job.description = description;
        job.requirement = requirement;
        job.job_level = job_level;
        job.minimum_salary = minimum_salary;
        job.maximum_salary = maximum_salary;
        job.type = type;
        job.location = location;
        job.starting_date = starting_date;
        job.minimum_experience = minimum_experience;
        await job.save();
        if (categories && categories.length > 0) {
          const categoriesInstance = await Category.findAll({
            where: { category: categories },
          });
          await job.setCategories(categoriesInstance);
        } else {
          await job.setCategories([]);
        }
        res.status(200).json({
          message: 'Updated Succesfully',
          updatedData: job,
        });
      } else {
        res.status(404).send('Job not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
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
