'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init({
    logo: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    publication_date: DataTypes.DATE,
    video_link: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Course',
  });
  Course.associate = (models) => {
    Course.hasMany(models.Lesson, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE',
      as: 'lessons'
    });
    Course.hasMany(models.CourseProgress, {
      foreignKey: 'courseID',
      onDelete: 'CASCADE',
      as: 'courseProgress'
    });
  }
  return Course;
};