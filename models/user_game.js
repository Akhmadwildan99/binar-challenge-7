'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Biodata,{
        foreignKey: 'userId'
      });
      this.hasOne(models.room, {
        foreignKey: 'userId'
      });
    }
    static #encrypt = (password) => bcrypt.hashSync(password, 10);
    static register = ({username, password, email, isAdmin}) => {
      const encryptedPassword = this.#encrypt(password);
      return this.create({username, password: encryptedPassword, email, isAdmin})
    }
    
    checkPassword = password => bcrypt.compareSync(password, this.password)
    
    generateToken = () => {
      const payload = {
        id : this.id,
        username: this.username,
        email: this.email,
        isAdmin: this.isAdmin
      }

      const secret = 'secret';
      const token = jwt.sign(payload, secret);
      return token;
    }

   /* Method Authenticate, untuk login Admin*/
   static authenticate = async ({username, password}) => {
    try {
      const user = await this.findOne({where: {username}});
      if(!user) return Promise.reject("Admin not Found!");
      const isPasswordValid = user.checkPassword(password);
      if(!isPasswordValid) return Promise.reject("Wrong password!");
      return Promise.resolve(user);
    } catch(err) {
      return Promise.reject(err);
    }
  } 

   

  };
  user_game.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user_game',
  });
  return user_game;
};