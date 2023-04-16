'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attainment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attainment.hasMany(models.Education, {
        foreignKey: 'attainment_id',
      });
    }
  }
  Attainment.init(
    {
      attainment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
    },
    {
      sequelize,
      modelName: 'Attainment',
      timestamps: true,
    }
  );
  return Attainment;
};
