const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const config = require('../config');
//'AirsoftTeams', 'postgres', 'q1w2e3r4' local
//'postgres://postgres:q1w2e3r4@postgresql:5432/AirsoftTeams' docker

//TODO Тут оставить чисто параметры конфигураций файлов
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

// TODO Значение параметра retries должно быть конфигурируемо (внести в config)
let retries = 5;
async function connection() {
while (retries) {
    try {
         await sequelize.sync();
         await sequelize
            .authenticate()
            .then(() => {
                console.log('Соединение установлено');
            })
            .catch(err => {
                console.error('Ошибка соединения');
            });
        break;
    } catch (err) {
        console.log(err);
        retries--;
        console.log(`retries left: ${retries}`);
        await new Promise(res => setTimeout(res, 5000));
    }
}
}
connection();

const modelNames = ['users', 'users_creds', 'users_tokens', 'comments'];
for (const modelName of modelNames) {
    sequelize.import (`../models/database/${modelName}.js`);
}

for (const modelName of Object.keys(sequelize.models)) {
    if ('associate' in sequelize.models[modelName]) {
        sequelize
            .models[modelName]
            .associate(sequelize.models);
    }
}


// TODO после добавлениея миграций - удалить метод по созднанию админа
async function createAdmin () {
    await sequelize.models.users.findOne({where: {username: process.env.DB_ADMIN_NAME || 'Admin_local'}}).then(async user => {
        if (user) {
            console.log('Пользователь с таким логином уже существует');
        } else {
            await sequelize.models.users.create(
                {
                    username: process.env.DB_ADMIN_NAME || 'Admin_local',
                    user_role: 'Admin',
                    team: null,
                    isActive: true,
                    isBlocked: false,
                    usercred: {
                        password: bcrypt.hashSync(process.env.DB_ADMIN_PASSWORD || '1234', bcrypt.genSaltSync(10), null)
                    },
                    tokens: {
                        token: null,
                        refreshToken: null
                    },
                    comment: {
                        blocked: null,
                        deleted: null,
                        actived: null
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
