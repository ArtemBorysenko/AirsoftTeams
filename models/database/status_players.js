module.exports = (sequelize, DataTypes) => {
    const status_players = sequelize.define("status_players", {
        status: {
            type: DataTypes.ENUM("Pending", "Approved", "Declined"),
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    })

    return status_players
}
