
var Sequelize = require('sequelize');
var db = require('../config/database');

var User = db.define('user', {
  fullName: {type:Sequelize.STRING, allowNull: false},
  email: {type:Sequelize.STRING, allowNull: false, unique: true},
  password: {type:Sequelize.STRING, allowNull: false},
  user_token: {type:Sequelize.STRING, allowNull: false}
});

User.sync();

module.exports = {
  User
}
