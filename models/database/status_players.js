module.exports = (sequelize, DataTypes) => {
    const status_players = sequelize.define("status_players", {
        status: {
            type: DataTypes.ENUM("pending", "approved", "declined"),
        },
    })

    status_players.associate = function(models) {
        // создать в этой таблице {{ statusplayers + Id }} forgeign key  с таблицы  status_players по id
        status_players.belongsTo(models.names_teams, {as: "team"})
        //  status_players.belongsTo(models.users, { as: 'user' });
    }

    return status_players
}
