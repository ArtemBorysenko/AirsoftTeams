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


//TODO: 2
// TODO после добавлениея миграций - удалить метод по созднанию админа
async function createAdmin () {
    await sequelize.models.users.findOne({where: {username: process.env.DB_ADMIN_NAME || 'Admin_local1'}}).then(async user => {
        if (user) {
            console.log('Пользователь с таким логином уже существует');
        } else {
            await sequelize.models.users.create(
                {
                    id: 10,
                    username: process.env.DB_ADMIN_NAME || 'Admin_local1',
                    user_role: 'Admin',
                    team: null,
                    isActive: true,
                    isBlocked: false,
                    usercred: {
                        id: 20,
                        password: bcrypt.hashSync(process.env.DB_ADMIN_PASSWORD || '1234', bcrypt.genSaltSync(10), null)
                    },
                    tokens: {
                        id: 30,
                        token: null,
                        refreshToken: null
                    },
                    comment: {
                        id: 40,
                        blocked: null,
                        deleted: null,
                        actived: null,
                    }
                },
                {
                    include: [{all: true}]
                }
            );
            console.log('Admin is created');
        }
    });
}
setTimeout(createAdmin, 1000);

module.exports = sequelize;
