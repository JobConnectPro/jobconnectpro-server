const { Skill } = require('../models');

class SkillController {
  static async findAllSkill(req, res) {
    try {
      const data = await Skill.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async findOneSkill(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Skill.findOne({ where: { id } });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async createSkill(req, res) {
    try {
      const { skill } = req.body;
      const data = await Skill.create({
        skill,
      });
      res
        .status(201)
        .json({ ...data.dataValues, message: 'Succesfully create skill!' });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateSkill(req, res, next) {
    try {
      const { id } = req.params;
      const { skill } = req.body;

      const findSkill = await Skill.findOne({ where: { id } });

      if (findSkill) {
        const data = await Skill.update(
          {
            skill,
          },
          { where: { id } }
        );
        res.status(201).json({ message: 'Succesfully update skill!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async destroySkill(req, res, next) {
    try {
      const { id } = req.params;
      const findSkill = await Skill.findOne({ where: { id } });

      if (findSkill) {
        const data = await Skill.destroy({ where: { id } });
        res.status(200).json({ message: 'Succesfully delete skill!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SkillController;
