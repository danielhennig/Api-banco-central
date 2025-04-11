'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contas', {
      numConta: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      saldo: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      },
      usuarioCpf: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'cpf'
        },
        onDelete: 'CASCADE'
      },
      instituicaoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Instituicaos',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contas');
  }
};
