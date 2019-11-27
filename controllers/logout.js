const db = require('../models/database/db');

async function logOut (req, res) {
    db.removeToken(req.id);
res.send('logout');
}

module.exports = {
    logOut
};