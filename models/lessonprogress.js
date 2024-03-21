'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class LessonProgress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      LessonProgress.belongsTo(models.User, {
        foreignKey: 'id'
      })
      LessonProgress.belongsTo(models.Lesson, {
        foreignKey: 'id'
      })
    }
  }
  LessonProgress.init({
    userId: DataTypes.UUID,
    lessonID: DataTypes.UUID,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LessonProgress'
  })

  return LessonProgress
}
