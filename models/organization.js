'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Organization.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      organization: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
    },
    {
      sequelize,
      modelName: 'Organization',
      timestamps: true,
    }
  );
  return Organization;
};
