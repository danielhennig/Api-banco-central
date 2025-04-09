const { DataTypes } = require('sequelize');
const db = require('../database');

const Instituicao = db.define('Instituicao', {
  nome: DataTypes.STRING,
});

module.exports = Instituicao;