'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LessonProgress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LessonProgress.init({
    userId: DataTypes.UUID,
    lessonID: DataTypes.UUID,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LessonProgress',
  });
  LessonProgress.associate = (models) => {
    LessonProgress.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    LessonProgress.belongsTo(models.Lesson, {
      foreignKey: 'lessonID',
    });
  }
  return LessonProgress;
};