"use strict"
const bcrypt = require("bcryptjs")

module.exports = {
    up: (queryInterface, Sequelize) =>
        Promise.all([
            queryInterface.bulkInsert("users", [
                {
                    username: "Admin@airsoftteams.org",
                    user_role: "Admin",
                    isBlocked: false,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]),

            queryInterface.bulkInsert("comments", [
                {
                    userCommentId: 1,
                    blocked: null,
                    deleted: null,
                    actived: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]),

            queryInterface.bulkInsert("users_creds", [
                {
                    userCredId: 1,
                    password: bcrypt.hashSync(
                        process.env.DB_ADMIN_PASSWORD || "1234",
                        bcrypt.genSaltSync(10),
                        null,
                    ),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]),
        ]),

    down: (queryInterface, Sequelize) => {
        return Promise.resolve()
    },
}
