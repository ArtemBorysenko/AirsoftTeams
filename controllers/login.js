const db = require('../models/database/db');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

async function logIn (req, res) {
    sequelize.models.users.findOne({ where: {username: req.body.username} }).then(user => {
        sequelize.models.users_creds.findOne({ where: {id: user.id} }).then(async users_creds => {
            if(bcrypt.compareSync(req.body.password, users_creds.password))
            {
                token = await db.createToken(user, res);
                res.send(token);
            }
            else {
                console.log('Неверный пароль');
                 const err = new Error();
                 err.status = 403;
                 throw err;
            }
        });
    }).catch((err) => {
        console.log('Неверный логин');
        res
            .status(400)
            .json({err: err.message});
    })
};

module.exports = {
    logIn
};
