const { Skill } = require('../models');

class SkillController {
  static async findSkills(req, res, next) {
    try {
      const data = await Skill.findAll({order: [['skill', 'ASC']]});

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async findSkill(req, res, next) {
    try {
      const { skillId } = req.params;
      const data = await Skill.findOne({ where: { id: skillId } });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async createSkill(req, res, next) {
    try {
      const { skill } = req.body;
      const uniqueSkill = await Skill.findOne({ where: { skill } });

      if (!uniqueSkill) {
        const data = await Skill.create({
          skill,
        });
        res.status(201).json({ ...data.dataValues, message: 'Successfully create skill!' });
      } else {
        throw { name: 'ValidationFailed' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateSkill(req, res, next) {
    try {
      const { skillId } = req.params;
      const { skill } = req.body;

      const findSkill = await Skill.findOne({ where: { id: skillId } });

      if (findSkill) {
        const data = await Skill.update({ skill }, { where: { id: skillId } });
        res.status(200).json({ message: 'Successfully update skill!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async destroySkill(req, res, next) {
    try {
      const { skillId } = req.params;

      const findSkill = await Skill.findOne({ where: { id: skillId } });

      if (findSkill) {
        const data = await Skill.destroy({ where: { id: skillId } });
        res.status(200).json({ message: 'Successfully delete skill!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SkillController;
