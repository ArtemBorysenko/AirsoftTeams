const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const config = require('../config');
//'AirsoftTeams', 'postgres', 'q1w2e3r4' local
//'postgres://postgres:q1w2e3r4@postgresql:5432/AirsoftTeams' docker

const sequelize =  new Sequelize(config.database.name, config.database.user, config.database.password, {
    host: config.database.host,
    port: config.database.port,
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = sequelize;
