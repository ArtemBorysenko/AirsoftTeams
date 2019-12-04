const Sequelize = require('sequelize');
const config = require('../config');

// Сделал TODO разделить докер и локал

if(process.env.DOCKER_DB_USER){
    const sequelize = new Sequelize(`postgres://${config.database.user}:${config.database.password}@postgresql:${config.database.port}/${config.database.name}`, {
        host: config.database.host,
        port: config.database.port,
        dialect: 'postgres',
        operatorsAliases: 0,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });

    module.exports = sequelize;
}
else {
    const sequelize = new Sequelize(config.database.name, config.database.user, config.database.password, {
        host: config.database.host,
        port: config.database.port,
        dialect: 'postgres',
        operatorsAliases: 0,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });

    module.exports = sequelize;
}


