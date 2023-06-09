'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.User, { foreignKey: 'user_id' });
      Bookmark.belongsTo(models.Job, { foreignKey: 'job_id' });
    }
  }
  Bookmark.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Bookmark',
      timestamps: true,
    }
  );
  return Bookmark;
};
