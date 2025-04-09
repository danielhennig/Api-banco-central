const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('banco_central', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;