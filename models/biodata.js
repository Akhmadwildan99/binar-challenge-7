'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Biodata extends Model {
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
  Biodata.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        len: [10, 12]
      }
    }
  }, {
    sequelize,
    modelName: 'Biodata',
  });
  return Biodata;
};