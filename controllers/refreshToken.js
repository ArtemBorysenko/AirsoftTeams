const db = require('../models/database/db');

async function refreshToken (req, res) {
   const user = await db.newRefreshToken(req.body.refreshToken, res);
};

module.exports = {
   refreshToken
};