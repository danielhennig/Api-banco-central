const { DataTypes } = require('sequelize');
const db = require('../database');
const Conta = require('./conta.js');

const Transacao = db.define('Transacao', {
    tipo: DataTypes.ENUM('credito', 'debito'),
    valor: DataTypes.FLOAT,
    descricao: DataTypes.STRING,
    data: DataTypes.DATE,
});

Transacao.belongsTo(Conta, { foreignKey: 'ContaId' });

module.exports = Transacao;