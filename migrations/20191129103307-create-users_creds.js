"use strict"

module.exports = {
    up: (queryInterface, DataTypes) =>
        Promise.all([
            queryInterface.createTable("users_creds", {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    unique: true,
                },
                userCredId: {
                    type: DataTypes.INTEGER,
                },
                password: {
                    type: DataTypes.STRING,
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
