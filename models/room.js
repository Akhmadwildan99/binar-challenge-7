'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user_game, {
        foreignKey: 'userId'
      })
    }
  };
  room.init({
    userId: DataTypes.INTEGER,
    playerOneId: DataTypes.UUID,
    playerTwoId: DataTypes.UUID,
    matchInfo: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['', '', '']
    },
    playerOne: DataTypes.STRING,
    playerTwo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};