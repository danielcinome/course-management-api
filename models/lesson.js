'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Lesson.belongsTo(models.Course, {
        foreignKey: 'id'
      })
      Lesson.hasMany(models.LessonProgress, {
        foreignKey: 'lessonId',
        onDelete: 'CASCADE'
      })
    }
  }
  Lesson.init({
    courseId: DataTypes.UUID,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    videoLink: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Lesson'
  })

  return Lesson
}
