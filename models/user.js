'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = (models) => {
    User.hasMany(models.LessonProgress, {
      foreignKey: 'lessonId',
      onDelete: 'CASCADE',
      as: 'lesson'
    });
    User.hasMany(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE',
      as: 'course'
    });
  }
  return User;
};