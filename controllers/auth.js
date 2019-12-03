const db = require('../models/database/db');

async function logIn (req, res, next) {
    await db.login(req, res, next);
}

async function logOut (req, res) {
   await db.removeToken(req.id);
    res.status(200).json('logout');
}

async function registration (req, res, next) {
    await db.registration(req, res, next);
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
