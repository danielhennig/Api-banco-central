const { DataTypes } = require('sequelize');
const db = require('../database');
const Usuario = require('./usuario.js');
const Instituicao = require('./instituicao.js');

const Conta = db.define('Conta', {
    saldo: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
});

Conta.belongsTo(Usuario);
Conta.belongsTo(Instituicao);

module.exports = Conta;