'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    cpf: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nome: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    tableName: 'Usuarios'
  });

  Usuario.associate = function(models) {
    Usuario.hasMany(models.Conta, {
      foreignKey: 'usuarioCpf',
      as: 'Contas' 
    });
  };

  return Usuario;
};
