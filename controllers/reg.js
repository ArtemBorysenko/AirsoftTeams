const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

async function registration (req, res, next) {
    sequelize.models.users.findOne({ where: {username: req.body.username} }).then(user => {
        if (user) {
            res.status(400).send('Пользователь с таким логином уже существует');
        }
            else
                sequelize.models.users.create(
                {
                    username: req.body.username,
                    user_role: req.body.user_role,
                    team: req.body.team,
                    isActive: req.body.isActive || false,
                    isBlocked: false,
                    usercred: {
                        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
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
                    include: [{all: true }]
                }
            );
            if(req.body.user_role === 'Manager' && !user) next();
            else res.status(200).send('Пользователь зарегистрирван');
    });

};

module.exports = {
    registration
};