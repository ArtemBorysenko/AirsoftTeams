const rc = require('rc');

module.exports = rc('JWT', {
    port: process.env.PORT || 3000,
    secret: 'VERYSECRETKEY_2',
    time : null,

    mailAdmin: process.env.ADMIN_MAIL || 'artem.borisenko@computools.com',
    mailManager: process.env.MANAGER_MAIL || 'artem.borisenko@computools.com',
    mailPlayer: process.env.PLAYER_MAIL || 'artem.borisenko@computools.com',
    BOT_EMAIL: process.env.BOT_MAIL || '',
    BOT_PASSWORD: process.env.BOT_PASSWORD || '',

    Admins: { },
    Managers: { },
    Players:{ },
    users: { },

    rooms: ['Admin', 'Manager', 'Player']
});
