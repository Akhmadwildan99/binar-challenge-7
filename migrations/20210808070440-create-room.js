'use strict';
const UUID = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      playerOneId: {
        type: Sequelize.INTEGER
      },
      playerTwoId: {
        type: Sequelize.INTEGER
      },
      winnerId: {
        type: Sequelize.INTEGER
      },
      matchInfo: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rooms');
  }
};