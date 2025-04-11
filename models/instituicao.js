'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instituicao = sequelize.define('Instituicao', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  return Instituicao;
};
