'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CourseProgress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      CourseProgress.belongsTo(models.User, {
        foreignKey: 'id'
      })
      CourseProgress.belongsTo(models.Course, {
        foreignKey: 'id'
      })
    }
  }
  CourseProgress.init({
    userId: DataTypes.UUID,
    courseID: DataTypes.UUID,
    state: DataTypes.STRING,
    aprovalDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CourseProgress'
  })

  return CourseProgress
}
