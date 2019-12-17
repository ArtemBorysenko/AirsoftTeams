const Sequelize = require("sequelize")
const config = require("../config")

const sequelize = new Sequelize(
    `postgres://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`,
    {
        host: config.database.host,
        port: config.database.port,
        dialect: "postgres",
        operatorsAliases: 0,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
)

module.exports = sequelize
