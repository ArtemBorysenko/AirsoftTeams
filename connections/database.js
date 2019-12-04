const Sequelize = require('sequelize');
const config = require('../config');

// Сделал TODO разделить докер и локал


    const sequelize = new Sequelize('postgres://postgres:q1w2e3r4@postgresql:5432/airsoftteams', {
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

// else {
//     const sequelize = new Sequelize(config.database.name, config.database.user, config.database.password, {
//         host: config.database.host,
//         port: config.database.port,
//         dialect: 'postgres',
//         operatorsAliases: false,
//
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         },
//     });
//
//     module.exports = sequelize;
// }


