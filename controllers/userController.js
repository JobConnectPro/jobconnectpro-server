require('dotenv').config();
const { User, Company, WorkExperience, Skill, Education, Project, Organization, Achievement, Attainment, Application, Bookmark, Job, UserSkill, Sector } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../email');

class UserController {
  // get all user
  static async findUsers(req, res, next) {
    try {
      const limit = +req.query.limit || 10;
      const page = +req.query.page || 1;
      const offset = (page - 1) * limit;

      const { count, rows } = await User.findAndCountAll({ limit, offset, order: [['role', 'ASC']] });
      res.status(200).json({
        totalItems: count,
        data: rows,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      });
    } catch (error) {
      next(error);
    }
  }

  // get logged user profile
  static async findUser(req, res, next) {
    try {
      const { id } = req.userLogged;
      const data = await User.findOne({
        where: {
          id,
        },
        include: [
          {
            model: WorkExperience,
          },
          {
            model: Skill,
            as: 'UserSkilled',
          },
          {
            model: Education,
            include: [Attainment],
          },
          {
            model: Achievement,
          },
          {
            model: Organization,
          },
          {
            model: Project,
          },
        ],
        order: [
          [WorkExperience, 'start_date', 'ASC'],
          [Education, 'start_date', 'ASC'],
          [Achievement, 'date', 'ASC'],
          [Organization, 'start_date', 'ASC'],
          [Project, 'start_date', 'ASC'],
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

  // update logged user profile
  static async updateUser(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { name, birthday, gender, phone, address, summary, salary_expectation } = req.body;

      const findUser = await User.findOne({ where: { id } });

      if (findUser) {
        const data = await User.update(
          {
            name,
            birthday,
            gender,
            phone,
            address,
            summary,
            salary_expectation,
          },
          { where: { id } }
        );
        res.status(200).json({ message: 'Successfully update data!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  // update logged user password
  static async updatePassword(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { password } = req.body;

      const findUser = await User.findOne({ where: { id } });

      if (findUser) {
        const hashPassword = await bcrypt.hash(password, 10);
        const data = await User.update({ password: hashPassword }, { where: { id } });
        res.status(200).json({ message: 'Successfully update password!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  // upload logged user photo
  static async uploadPhoto(req, res, next) {
    try {
      const { id } = req.userLogged;
      const findUser = await User.findOne({ where: { id } });

      if (findUser) {
        if (req.file != null) {
          const photo = req.file.filename;
          const file = `http://localhost:${process.env.PORT}/uploads/photo/${photo}`;
          const data = await User.update(
            {
              photo: file,
            },
            { where: { id } }
          );
          res.status(200).json({ message: 'Successfully update photo!' });
        } else {
          res.status(400).json({ message: 'Photo cannot be null!' });
        }
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  // upload logged user resume
  static async uploadResume(req, res, next) {
    try {
      const { id } = req.userLogged;
      const findUser = await User.findOne({ where: { id } });

      if (findUser) {
        if (req.file != null) {
          const resume = req.file.filename;
          const file = `http://localhost:${process.env.PORT}/uploads/resume/${resume}`;
          const data = await User.update(
            {
              resume: file,
            },
            { where: { id } }
          );
          res.status(200).json({ message: 'Successfully update resume!' });
        } else {
          res.status(400).json({ message: 'Resume cannot be null!' });
        }
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  // get logged user applications
  static async findApplications(req, res, next) {
    try {
      const { id } = req.userLogged;
      const data = await User.findOne({
        where: {
          id,
        },
        include: [{ model: Job, as: 'UserApplication', include: [{ model: Company }] }],
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

  // create logged user application
  static async createApplication(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { job_id } = req.body;

      const findApplication = await Application.findOne({
        where: {
          user_id: id,
          job_id,
        },
      });

      if (findApplication) {
        res.status(400).json({ message: 'Already apply job!' });
      } else {
        const data = await Application.create({
          user_id: id,
          job_id,
        });
        res.status(201).json({ ...data.dataValues, message: 'Successfully apply job!' });
      }
    } catch (error) {
      next(error);
    }
  }

  // delete logged user application
  static async destroyApplication(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { jobId } = req.params;

      const findApplication = await Application.findOne({
        where: {
          user_id: id,
          job_id: jobId,
        },
      });

      if (findApplication) {
        const data = await Application.destroy({
          where: {
            user_id: id,
            job_id: jobId,
          },
        });
        res.status(200).json({ message: 'Successfully cancel apply job!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  // get logged user bookmark
  static async findBookmarks(req, res, next) {
    try {
      const { id } = req.userLogged;
      const data = await User.findOne({
        where: {
          id,
        },
        include: [{ model: Job, as: 'UserBookmark', include: [{ model: Company }] }],
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

  // create logged user bookmark
  static async createBookmark(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { job_id } = req.body;

      const findBookmark = await Bookmark.findOne({
        where: {
          user_id: id,
          job_id,
        },
      });

      if (findBookmark) {
        res.status(400).json({ message: 'Already bookmark job!' });
      } else {
        const data = await Bookmark.create({
          user_id: id,
          job_id,
        });
        res.status(201).json({ ...data.dataValues, message: 'Successfully bookmark job!' });
      }
    } catch (error) {
      next(error);
    }
  }

  // delete logged user bookmark
  static async destroyBookmark(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { jobId } = req.params;

      const findBookmark = await Bookmark.findOne({
        where: {
          user_id: id,
          job_id: jobId,
        },
      });

      if (findBookmark) {
        const data = await Bookmark.destroy({
          where: {
            user_id: id,
            job_id: jobId,
          },
        });

        res.status(200).json({ message: 'Successfully remove bookmark job!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  // get all employer
  static async findEmployers(req, res, next) {
    try {
      const limit = +req.query.limit || 10;
      const page = +req.query.page || 1;
      const offset = (page - 1) * limit;

      const { count, rows } = await User.findAndCountAll({
        where: {
          role: 'Employer',
        },
        limit,
        offset,
        include: [
          {
            model: Company,
            include: [{ model: Sector }],
          },
        ],
      });

      res.status(200).json({
        totalItems: count,
        data: rows,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      });
    } catch (error) {
      next(error);
    }
  }

  // get employer jobs
  static async findEmployerJobPosts(req, res, next) {
    try {
      const { userId } = req.params;
      const data = await User.findOne({
        where: {
          id: userId,
          role: 'Employer',
        },
        include: [
          {
            model: Job,
            include: [{ model: Company, include: [{ model: Sector }] }],
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

  // get logged user company
  static async findUserCompany(req, res, next) {
    try {
      const { id } = req.userLogged;
      const data = await User.findAll({
        where: {
          id,
        },
        include: [
          {
            model: Company,
            include: [{ model: Sector }],
          },
        ],
        order: [[Company, 'company_name', 'ASC']],
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

  // get logged user job post
  static async findJobPosts(req, res, next) {
    try {
      const { id } = req.userLogged;
      const data = await User.findOne({
        where: {
          id,
        },
        include: [{ model: Job, include: [{ model: Company }] }],
        order: [[Job, 'createdAt', 'ASC']],
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

  // get job applicant
  static async findJobPost(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { jobId } = req.params;
      const data = await Job.findOne({
        where: {
          id: jobId,
          user_id: id,
        },
        include: [
          {
            model: User,
            as: 'JobApplication',
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

  // get applicant profile
  static async findApplicant(req, res, next) {
    try {
      const { userId, jobId } = req.params;
      const data = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          { model: Job, as: 'UserApplication', where: { id: jobId } },
          {
            model: WorkExperience,
          },
          {
            model: Skill,
            as: 'UserSkilled',
          },
          {
            model: Education,
            include: [Attainment],
          },
          {
            model: Achievement,
          },
          {
            model: Organization,
          },
          {
            model: Project,
          },
        ],
        order: [
          [WorkExperience, 'start_date', 'ASC'],
          [Education, 'start_date', 'ASC'],
          [Achievement, 'date', 'ASC'],
          [Organization, 'start_date', 'ASC'],
          [Project, 'start_date', 'ASC'],
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

  // update applicant status
  static async updateApplication(req, res, next) {
    try {
      const { userId, jobId } = req.params;
      const { status, description } = req.body;
      const findApplication = await Application.findOne({
        where: {
          user_id: userId,
          job_id: jobId,
        },
        include: [
          {
            model: Job,
            include: [Company],
          },
          {
            model: User,
          },
        ],
      });

      if (findApplication) {
        const data = await Application.update(
          {
            status,
            description,
          },
          {
            where: {
              user_id: userId,
              job_id: jobId,
            },
          }
        );
        res.status(200).json({ message: 'Successfully update status!' });

        const emailData = {
          name: findApplication.User.name,
          email: findApplication.User.email,
          title: findApplication.Job.title,
          company: findApplication.Job.Company.company_name,
          status: findApplication.status,
          description: findApplication.description,
        };
        await sendMail(emailData);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  // create logged user skill
  static async createSkill(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { skill_id, level } = req.body;

      const findSkill = await UserSkill.findOne({
        where: {
          user_id: id,
          skill_id,
        },
      });

      if (findSkill) {
        res.status(400).json({ message: 'Already add skill!' });
      } else {
        const data = await UserSkill.create({
          user_id: id,
          skill_id,
          level,
        });
        res.status(201).json({ ...data.dataValues, message: 'Successfully add skill!' });
      }
    } catch (error) {
      next(error);
    }
  }

  // delete logged user skill
  static async deleteSkill(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { skillId } = req.params;

      const findSkill = await UserSkill.findOne({
        where: {
          user_id: id,
          skill_id: skillId,
        },
      });

      if (findSkill) {
        const data = await UserSkill.destroy({
          where: {
            user_id: id,
            skill_id: skillId,
          },
        });
        res.status(200).json({ message: 'Successfully remove skill!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  // user register
  static async register(req, res, next) {
    try {
      const { name, email, password, role, birthday, gender, phone, address } = req.body;

      const uniqueEmail = await User.findOne({
        where: {
          email,
        },
      });

      if (!uniqueEmail) {
        const data = await User.create({
          name,
          email,
          password,
          role,
          birthday,
          gender,
          phone,
          address,
        });
        res.status(201).json({ ...data.dataValues, message: 'Successfully register!' });
      } else {
        throw { name: 'UserExist' };
      }
    } catch (error) {
      next(error);
    }
  }

  // user login
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({
        where: { email },
      });

      if (findUser) {
        const comparePassword = await bcrypt.compare(password, findUser.password);
        if (comparePassword) {
          const token = jwt.sign(
            {
              id: findUser.id,
              name: findUser.name,
              email: findUser.email,
              role: findUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
          );
          res.status(200).json({
            token,
            role: findUser.role,
          });
        } else {
          throw { name: 'WrongPassword' };
        }
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
