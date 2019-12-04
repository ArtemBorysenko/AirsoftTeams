    //сделал TODO login logout reg refreshtoken
const db = require('../models/database/db');

async function logIn (req, res, next) {
    await db.login(req, res, next);
    // Сделал TODO внести в  database db.js
}

async function logOut (req, res) {
   await db.removeToken(req.id);
    //Сделал TODO res.send заменить на res.json
}

async function registration (req, res, next) {
    await db.registration(req, res, next);
    // Сделал TODO внести в database db.js
}

async function refreshToken (req, res) {
    await db.newRefreshToken(req.body.refreshToken, res);
}

module.exports = {
    registration,
    logIn,
    logOut,
    refreshToken,
};

//сделал TODO роутеры по ролям
//таблица роли роль == возможность