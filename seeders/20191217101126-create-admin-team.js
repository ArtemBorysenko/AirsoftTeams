"use strict"
const bcrypt = require("bcryptjs")

module.exports = {
    up: (queryInterface, Sequelize) =>
        Promise.all([
            queryInterface.bulkInsert("names_teams", [
                {
                    id: 1,
                    name: "team_A",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]),

            queryInterface.bulkInsert("users", [
                {
                    username: "Admin@airsoftteams.org",
                    user_role: "Admin",
                    teamId: 1,
                    isBlocked: false,
                    isActive: true,
                    usercredId: 1,
                    commentId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]),

            queryInterface.bulkInsert("users_tokens", [
                {
                    token: null,
                    refreshToken: null,
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]),

            queryInterface.bulkInsert("status_players", [
                {
                    id: 1,
                    userId: 1,
                    teamId: 1,
                    status: "approved",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]),
        ]),

    down: (queryInterface, Sequelize) => {
        return Promise.resolve()
    },
}
