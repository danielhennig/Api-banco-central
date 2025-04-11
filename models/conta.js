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
      allowNull: false,
      defaultValue: 0.0
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
    Conta.belongsTo(models.Usuario, { foreignKey: 'usuarioCpf' });
    Conta.belongsTo(models.Instituicao, { foreignKey: 'instituicaoId' });
  };

  return Conta;
};
