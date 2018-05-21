require('dotenv').config();
require('dotenv').load();

var Sequelize = require('sequelize');
let db = null;

if(process.env.DATABASE_URL){
  db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
  });
  console.log('Connected to remote db');
} else {
  db = new Sequelize('kohactive_coding_challenge_node', 'root', '', {
    host: 'localhost',
    dialect: 'postgres'
  });
  console.log('connected to db locally');
}


module.exports = db;
