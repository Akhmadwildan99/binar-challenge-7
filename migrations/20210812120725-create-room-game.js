'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Room_games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomId: {
        type: Sequelize.UUID
      },
      playerOneId: {
        type: Sequelize.INTEGER
      },
      playerTwoId: {
        type: Sequelize.INTEGER
      },
      playerOne: {
        type: Sequelize.STRING
      },
      playerTwo: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Room_games');
  }
};