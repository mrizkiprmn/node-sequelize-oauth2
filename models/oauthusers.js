'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OAuthUsers extends Model {
    static associate(models) {
      OAuthUsers.hasOne(models.OAuthTokens, {
        foreignKey: 'userId',
        as: 'token'
      });
    }
  };
  OAuthUsers.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OAuthUsers',
  });
  OAuthUsers.beforeSave((user) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  })
  return OAuthUsers;
};