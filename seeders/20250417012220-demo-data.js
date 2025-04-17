'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Instituicaos', [
      { nome: 'Banco do Brasil', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Itaú', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Bradesco', createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert('Usuarios', [
      { cpf: '11111', nome: 'Ana Silva', email: 'ana@email.com', createdAt: new Date(), updatedAt: new Date() },
      { cpf: '22222', nome: 'Carlos Souza', email: 'carlos@email.com', createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert('Contas', [
      { usuarioCpf: '11111', instituicaoId: 1, saldo: 1500, createdAt: new Date(), updatedAt: new Date() },
      { usuarioCpf: '22222', instituicaoId: 2, saldo: 800, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contas', null, {});
    await queryInterface.bulkDelete('Usuarios', null, {});
    await queryInterface.bulkDelete('Instituicaos', null, {});
  }
};
