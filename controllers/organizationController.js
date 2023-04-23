const { where } = require("sequelize");
const { Organization } = require("../models");

class OrganizationController {
  static async createOrganization(req, res, next) {
    // console.log(req.userLogged.id);
    // console.log(req.body);

    try {
      const { organization, role, start_date, end_date, description } =
        req.body;
      const { id } = req.userLogged;
      const data = await Organization.create({
        user_id: id,
        organization,
        role,
        start_date,
        end_date,
        description,
      });

      if (data) {
        res.status(200).json({ message: "Succesfully create Organization!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async findOrganization(req, res, next) {
    try {
      const { id } = req.userLogged;

      const data = await Organization.findAll({
        where: { user_id: id },
      });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { organization, role, start_date, end_date, description } =
        req.body;

      const data = await Organization.update(
        {
          organization,
          role,
          start_date,
          end_date,
          description,
        },
        {
          where: { id: +id },
        }
      );
      res.status(201).json({
        message: "Movie Updated Successfuly!",
      });
    } catch (err) {
      next(err);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const findOrganization = await Organization.findOne({
        where: { id: +id },
      });
      if (findOrganization) {
        const data = await Organization.destroy({ where: { id: +id } });
        res.status(200).json({ message: "Succesfully delete organization!" });
      } else {
        res.status(404).json({ message: "Organization not found!" });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrganizationController;
