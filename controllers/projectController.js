const { Project } = require('../models');

class ProjectController {
  static async findProjects(req, res, next) {
    try {
      const { id } = req.userLogged;

      const data = await Project.findAll({
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

  static async findProject(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { projectId } = req.params;

      const data = await Project.findOne({
        where: { id: projectId, user_id: id },
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

  static async createProject(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { project_name, role, link, start_date, end_date, description } = req.body;

      const data = await Project.create({
        user_id: id,
        project_name,
        role,
        link,
        start_date,
        end_date,
        description,
      });
      res.status(201).json({ ...data.dataValues, message: 'Successfully add project!' });
    } catch (error) {
      next(error);
    }
  }

  static async updateProject(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { projectId } = req.params;
      const { project_name, role, link, start_date, end_date, description } = req.body;

      const findProject = await Project.findOne({
        where: { id: projectId, user_id: id },
      });

      if (findProject) {
        const data = await Project.update(
          {
            project_name,
            role,
            link,
            start_date,
            end_date,
            description,
          },
          {
            where: { id: projectId, user_id: id },
          }
        );
        res.status(201).json({
          message: 'Successfully update project!',
        });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async destroyProject(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { projectId } = req.params;

      const findProject = await Project.findOne({
        where: { id: projectId, user_id: id },
      });

      if (findProject) {
        const data = await Project.destroy({ where: { id: projectId, user_id: id } });
        res.status(200).json({ message: 'Successfully delete project!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProjectController;
