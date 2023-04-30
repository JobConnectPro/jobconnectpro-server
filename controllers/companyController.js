require('dotenv').config();
const { Company, Sector, Job, User } = require('../models');
class CompanyController {
  static async findCompanies(req, res, next) {
    try {
      const data = await Company.findAll({
        order: [['company_name', 'ASC']],
        include: [
          {
            model: Sector,
          },
          {
            model: User,
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

  static async findCompany(req, res, next) {
    try {
      const { companyId } = req.params;

      const data = await Company.findOne({
        where: {
          id: companyId,
        },
        include: [
          {
            model: Sector,
          },
          {
            model: Job,
          },
          {
            model: User,
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

  static async createCompany(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { sector_id, company_name, address, description, website } = req.body;

      const logo = req.file.filename;
      const file = `http://localhost:${process.env.PORT}/uploads/logo/${logo}`;

      const data = await Company.create({
        user_id: id,
        sector_id: +sector_id,
        company_name,
        address,
        description,
        website,
        logo: file,
      });

      if (data) {
        res.status(201).json({ ...data.dataValues, message: 'Successfully create company!' });
      } else {
        throw { name: 'ValidationFailed' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateCompany(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { companyId } = req.params;
      const { sector_id, company_name, address, description, website } = req.body;

      const findCompany = await Company.findOne({
        where: { id: companyId, user_id: id },
      });

      if (findCompany) {
        const data = await Company.update(
          {
            sector_id,
            company_name,
            address,
            description,
            website,
          },
          {
            where: {
              id: companyId,
              user_id: id,
            },
          }
        );
        res.status(200).json({ message: 'Successfully update company!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateCompanyLogo(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { companyId } = req.params;

      const findCompany = await Company.findOne({
        where: { id: companyId, user_id: id },
      });

      if (findCompany) {
        if (req.file != null) {
          const logo = req.file.filename;
          const file = `http://localhost:${process.env.PORT}/uploads/logo/${logo}`;
          const data = await Company.update(
            {
              logo: file,
            },
            {
              where: {
                id: companyId,
                user_id: id,
              },
            }
          );
          res.status(200).json({ message: 'Successfully update logo!' });
        } else {
          res.status(400).json({ message: 'Logo cannot be null!' });
        }
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async destroyCompany(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { companyId } = req.params;

      const findCompany = await Company.findOne({
        where: { id: companyId, user_id: id },
      });

      if (findCompany) {
        const data = await Company.destroy({
          where: {
            id: companyId,
            user_id: id,
          },
        });
        res.status(200).json({ message: 'Successfully delete company!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CompanyController;
