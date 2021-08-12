'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Room_game.init({
    roomId: DataTypes.UUID,
    playerOneId: DataTypes.INTEGER,
    playerTwoId: DataTypes.INTEGER,
    playerOne: DataTypes.STRING,
    playerTwo: DataTypes.STRING,
    matchInfo: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['','','','','','']
    }
  }, {
    sequelize,
    modelName: 'Room_game',
  });
  return Room_game;
};