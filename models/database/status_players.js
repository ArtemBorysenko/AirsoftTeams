module.exports = (sequelize, DataTypes) => {
    const status_players = sequelize.define("status_players", {
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
    })

    // status_players.associate = function(models) {
    // // создать в этой таблице {{ statusplayers + Id }} forgeign key  с таблицы  status_players по id
    // status_players.belongsTo(models.names_teams, {as: "team"})
    //status_players.belongsTo(models.names_teams, {as: "team"}) // FK_userId
    //status_players.belongsTo(models.users, {as: "team"}) // FK_userId
    // //  status_players.belongsTo(models.users, { as: 'user' });
    // }

    return status_players
}
