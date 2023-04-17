'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Achievement, {
        foreignKey: 'user_id',
      });

      User.hasMany(models.Organization, {
        foreignKey: 'user_id',
      });

      User.hasMany(models.Project, {
        foreignKey: 'user_id',
      });

      User.hasMany(models.WorkExperience, {
        foreignKey: 'user_id',
      });

      User.hasMany(models.Education, {
        foreignKey: 'user_id',
      });

      User.hasMany(models.Company, {
        foreignKey: 'user_id',
      });

      User.hasMany(models.Job, {
        foreignKey: 'user_id',
      });

      User.belongsToMany(models.Skill, {
        through: models.UserSkill,
        foreignKey: 'user_id',
      });

      User.belongsToMany(models.Job, {
        through: models.Application,
        as: 'UserApplication',
        foreignKey: 'user_id',
      });

      User.belongsToMany(models.Job, {
        through: models.Bookmark,
        as: 'UserBookmark',
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
          len: [1, 255],
        },
      },
      password: {
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
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
          len: [1, 255],
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 255],
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 255],
        },
      },
      salary_expectation: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: true,
          len: [1, 255],
        },
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 255],
        },
      },
      resume: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 255],
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          const salt = bcrypt.genSaltSync(10);
          const hashPassword = bcrypt.hashSync(user.password, salt);
          user.password = hashPassword;
        },
      },
      sequelize,
      modelName: 'User',
      timestamps: true,
    }
  );
  return User;
};
