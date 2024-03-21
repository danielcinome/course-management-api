'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lessonProgresses', {
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
      lessonID: {
        type: Sequelize.UUID,
        references: {
          model: 'lessons',
          key: 'uuid',
          as: 'lessonId'
        }
      },
      state: {
        type: Sequelize.ENUM('pending' ,'progress', 'finished'),
        defaultValue: 'pending'
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
    await queryInterface.dropTable('lessonProgresses');
  }
};