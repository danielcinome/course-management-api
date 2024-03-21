'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courseProgresses', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'uuid',
          as: 'userId'
        }
      },
      courseID: {
        type: Sequelize.UUID,
        references: {
          model: 'courses',
          key: 'uuid',
          as: 'courseId'
        }
      },
      state: {
        type: Sequelize.ENUM('pending' ,'progress', 'finished'),
        defaultValue: 'pending'
      },
      aprovalDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courseProgresses');
  }
};