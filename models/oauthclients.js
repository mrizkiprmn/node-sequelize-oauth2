'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OAuthClients extends Model {
    static associate(models) {
      OAuthClients.hasOne(models.OAuthTokens, {
        foreignKey: 'clientId',
        as: 'token'
      });
    }
  };
  OAuthClients.init({
    clientId: DataTypes.STRING,
    clientSecret: DataTypes.STRING,
    redirectUris: DataTypes.STRING,
    grants: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'OAuthClients',
  });
  return OAuthClients;
};