'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Job.belongsTo(models.Company, {
        foreignKey: 'company_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Job.belongsToMany(models.Category, {
        through: models.JobCategory,
        foreignKey: 'job_id',
      });

      Job.belongsToMany(models.User, {
        through: models.Bookmark,
        foreignKey: 'job_id',
      });

      Job.belongsToMany(models.User, {
        through: models.Application,
        foreignKey: 'job_id',
      });
    }
  }
  Job.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      requirement: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      job_level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      minimum_salary: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: true,
          len: [1, 255],
        },
      },
      maximum_salary: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: true,
          len: [1, 255],
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      starting_date: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: true,
        },
      },
      minimum_experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Job',
      timestamps: true,
    }
  );
  return Job;
};
