const { DataTypes } = require('sequelize');
const db = require('../database');

const Usuario = db.define('Usuario', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = Usuario;
