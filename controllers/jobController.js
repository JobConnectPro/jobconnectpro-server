const { Job } = require("../models");
const { Category } = require("../models");

class JobController {
  static async findAllJobs(req, res) {
    try {
      const data = await Job.findAll({
        include: [
          {
            model: Category,
            attributes: ["category"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async getJobById(req, res) {
    const { id } = req.params;
    try {
      const data = await Job.findByPk(id, {
        include: [
          {
            model: Category,
            attributes: ["category"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Job Not Found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async createJobs(req, res) {
    const {
      company_id,
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
    const userId = req.userLogged.id;
    try {
      const job = await Job.create({
        user_id: userId,
        company_id,
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
        await job.addCategories(categoriesInstance);
      }
      res.status(201).json({
        message: "job created",
        fullField: {
          data: job,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async updateJob(req, res) {
    const { id } = req.params;
    const {
      company_id,
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
    try {
      const job = await Job.findByPk(id);
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
          message: "Updated Succesfully",
          updatedData: job,
        });
      } else {
        res.status(404).send("Job not found");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async deleteJob(req, res) {
    const { id } = req.params;
    try {
      const job = await Job.findByPk(id);
      if (job) {
        await job.destroy();
        res.status(200).json({ message: "Succesfuly Deleted" });
      } else {
        res.status(404).send("Job not found");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = JobController;
