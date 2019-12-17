"use strict"
const bcrypt = require("bcryptjs")

module.exports = {
    up: (queryInterface, Sequelize) =>
        Promise.all([
            // queryInterface.bulkInsert('users_tokens', [{
            //   token: null,
            //   refreshToken: null,
            //   userId: 1,
            //   createdAt: new Date(),
            //   updatedAt: new Date(),
            // }]),
        ]),

    down: (queryInterface, Sequelize) => {
        return Promise.resolve()
    },
}
