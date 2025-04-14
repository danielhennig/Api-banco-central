'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conta = sequelize.define('Conta', {
    numConta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    saldo: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    usuarioCpf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instituicaoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Contas'
  });

  Conta.associate = function (models) {
    Conta.belongsTo(models.Usuario, {
      foreignKey: 'usuarioCpf',
      as: 'Usuario'
    });

    Conta.belongsTo(models.Instituicao, {
      foreignKey: 'instituicaoId',
      as: 'Instituicao'
    });
  };
  Conta.associate = function (models) {
    Conta.belongsTo(models.Usuario, { foreignKey: 'usuarioCpf', as: 'Usuario' });
    Conta.belongsTo(models.Instituicao, { foreignKey: 'instituicaoId', as: 'Instituicao' });
    Conta.hasMany(models.Transacao, { foreignKey: 'contaId', as: 'Transacoes' }); // ← aqui!
  };


  return Conta;
};
