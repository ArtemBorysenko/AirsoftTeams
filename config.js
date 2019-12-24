const rc = require("rc")
require("dotenv").config()

module.exports = rc("JWT", {
    SOCKETS_MODULE: process.env.SOCKETS_MODULE || true,
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    secret: process.env.JWT_SECRET || "VERYSECRETKEY_2",
    time: null,
    regId: 5,

    mailAdmin: process.env.ADMIN_MAIL || "artem.borisenko@computools.com",
    mailManager: process.env.MANAGER_MAIL || "artem.borisenko@computools.com",
    mailPlayer: process.env.PLAYER_MAIL || "artem.borisenko@computools.com",
    BOT_EMAIL: process.env.BOT_MAIL_USERNAME || "artem.BOT@computools.com",
    BOT_PASSWORD: process.env.BOT_MAIL_PASSWORD || "12345",

    users: {},

    rooms: ["Admin", "Manager", "Player"],

    database: {
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "q1w2e3r4",
        host: process.env.POSTGRES_HOST || "localhost",
        port: process.env.DOCKER_DB_PORT || "5432",
        name: process.env.DB_NAME || "airsoftteams",
        retries: 10,
        dialect: "postgres",
        defaultUser: {
            name: process.env.ADMIN_USER || "Admin",
            password: process.env.ADMIN_PASSWORD || "1234",
        },
    },
})
