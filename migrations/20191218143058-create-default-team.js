"use strict"

module.exports = {
    up: (queryInterface, Sequelize) =>
        Promise.all([
            queryInterface.bulkInsert("teams_names", [
                {
                    name: "A",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]),

            queryInterface.bulkInsert("teams_names", [
                {
                    name: "B",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]),
        ]),

    down: (queryInterface, Sequelize) => {
        return Promise.resolve()
    },
}
