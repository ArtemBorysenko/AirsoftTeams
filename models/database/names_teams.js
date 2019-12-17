module.exports = (sequelize, DataTypes) => {
    const names_teams = sequelize.define("names_teams", {
        name: {
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
    })

    names_teams.associate = function(models) {
        // создать в этой таблице {{ statusplayers + Id }} forgeign key  с таблицы  status_players по id
        //   names_teams.belongsTo(models.status_players, { as: 'statusplayers' });
        names_teams.hasOne(models.status_players, {as: "team"})
    }

    return names_teams
}
