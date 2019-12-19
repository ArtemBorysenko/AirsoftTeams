"use strict"
const bcrypt = require("bcryptjs")

module.exports = {
    up: (queryInterface, Sequelize) =>
        Promise.all([
            queryInterface.bulkInsert("users_tokens", [
                {
                    userId: 1,
                    token: null,
                    refreshToken: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]),
        ]),

    down: (queryInterface, Sequelize) => {
        return Promise.resolve()
    },
}
