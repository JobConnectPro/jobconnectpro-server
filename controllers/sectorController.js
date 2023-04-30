const { Sector } = require('../models');

class SectorController {
  static async findSectors(req, res, next) {
    try {
      const data = await Sector.findAll({ order: [['sector', 'ASC']] });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async findSector(req, res, next) {
    try {
      const { sectorId } = req.params;
      const data = await Sector.findOne({ where: { id: sectorId } });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async createSector(req, res, next) {
    try {
      const { sector } = req.body;
      const uniqueSector = await Sector.findOne({ where: { sector } });

      if (!uniqueSector) {
        const data = await Sector.create({
          sector,
        });
        res.status(201).json({ ...data.dataValues, message: 'Successfully create sector!' });
      } else {
        throw { name: 'ValidationFailed' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateSector(req, res, next) {
    try {
      const { sectorId } = req.params;
      const { sector } = req.body;

      const findSector = await Sector.findOne({ where: { id: sectorId } });

      if (findSector) {
        const data = await Sector.update({ sector }, { where: { id: sectorId } });
        res.status(200).json({ message: 'Successfully update sector!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async destroySector(req, res, next) {
    try {
      const { sectorId } = req.params;

      const findSector = await Sector.findOne({ where: { id: sectorId } });

      if (findSector) {
        const data = await Sector.destroy({ where: { id: sectorId } });
        res.status(200).json({ message: 'Successfully delete sector!' });
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SectorController;
