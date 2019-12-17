"use strict"

module.exports = {
    up: (queryInterface, DataTypes) =>
        Promise.all([
            queryInterface.createTable("status_players", {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    unique: true,
                },
                userId: {
                    type: DataTypes.INTEGER,
                },
                teamId: {
                    type: DataTypes.INTEGER,
                },
                status: {
                    type: DataTypes.ENUM("pending", "approved", "declined"),
                },
                createdAt: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
            }),
        ]),

    down: (queryInterface, Sequelize) => {
        return Promise.resolve()
    },
}
