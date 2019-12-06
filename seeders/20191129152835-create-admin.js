"use strict"
const bcrypt = require("bcryptjs")

module.exports = {
    up: (queryInterface, Sequelize) =>
        Promise.all([
            queryInterface.bulkInsert("comments", [
                {
                    blocked: null,
                    deleted: null,
                    actived: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]),

            queryInterface.bulkInsert("users_creds", [
                {
                    password: bcrypt.hashSync(
                        process.env.DB_ADMIN_PASSWORD || "1234",
                        bcrypt.genSaltSync(10),
                        null,
                    ),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]),

            queryInterface.bulkInsert("users", [
                {
                    username: "Admin@airsoftteams.org",
                    user_role: "Admin",
                    team: null,
                    isBlocked: false,
                    isActive: true,
                    usercredId: 1,
                    commentId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]),
        ]),

    down: (queryInterface, Sequelize) => {
        return Promise.resolve()
    },
}
