const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('banco_central', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;