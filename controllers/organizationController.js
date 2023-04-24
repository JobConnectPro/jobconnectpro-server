const { Organization } = require('../models');

class OrganizationController {
  static async findOrganizations(req, res, next) {
    try {
      const { id } = req.userLogged;

      const data = await Organization.findAll({
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

  static async findOrganization(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { organizationId } = req.params;

      const data = await Organization.findOne({
        where: { id: organizationId, user_id: id },
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

  static async createOrganization(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { organization, role, start_date, end_date, description } = req.body;

      const data = await Organization.create({
        user_id: id,
        organization,
        role,
        start_date,
        end_date,
        description,
      });
      res.status(201).json({ ...data.dataValues, message: 'Successfully add organization!' });
    } catch (error) {
      next(error);
    }
  }

  static async updateOrganization(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { organizationId } = req.params;
      const { organization, role, start_date, end_date, description } = req.body;

      const findOrganization = await Organization.findOne({
        where: { id: organizationId, user_id: id },
      });

      if (findOrganization) {
        const data = await Organization.update(
          {
            organization,
            role,
            start_date,
            end_date,
            description,
          },
          {
            where: { id: organizationId, user_id: id },
          }
        );
        res.status(201).json({
          message: 'Successfully update organization!',
        });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async destroyOrganization(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { organizationId } = req.params;

      const findOrganization = await Organization.findOne({
        where: { id: organizationId, user_id: id },
      });

      if (findOrganization) {
        const data = await Organization.destroy({ where: { id: organizationId, user_id: id } });
        res.status(200).json({ message: 'Successfully delete organization!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrganizationController;
