const rc = require("rc")
require("dotenv").config()

module.exports = rc("JWT", {
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

    Admins: {},
    Managers: {},
    Players: {},
    users: {},

    rooms: ["Admin", "Manager", "Player"],

    database: {
        user: process.env.DOCKER_DB_USER || process.env.DB_USER || "postgres",
        password:
            process.env.DOCKER_DB_PASSWORD ||
            process.env.DB_PASSWORD ||
            "q1w2e3r4",
        host: process.env.POSTGRES_HOST || "localhost",
        port: process.env.DOCKER_DB_PORT || "5432",
        name:
            process.env.DOCKER_DB_NAME || process.env.DB_NAME || "airsoftteams",
        retries: 5,
        dialect: "postgres",
        defaultUser: {
            name: process.env.ADMIN_USER || "Admin",
            password: process.env.ADMIN_PASSWORD || "1234",
        },
    },
})
