'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transacao = sequelize.define('Transacao', {
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    contaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Transacaos'
  });

  Transacao.associate = function(models) {
    Transacao.belongsTo(models.Conta, {
      foreignKey: 'contaId',
      as: 'Conta'
    });
  };

  return Transacao;
};
