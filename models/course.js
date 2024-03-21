'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Course.hasMany(models.Lesson, {
        foreignKey: 'id',
        onDelete: 'CASCADE'
      })
      Course.hasMany(models.CourseProgress, {
        foreignKey: 'courseID',
        onDelete: 'CASCADE'
      })
    }
  }
  Course.init({
    logo: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    publicationDate: DataTypes.DATE,
    videoLink: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Course'
  })

  return Course
}
