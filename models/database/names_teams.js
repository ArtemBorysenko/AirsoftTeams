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
        //  names_teams.hasMany(models.users, {as: "team"}) // FK_userId
        names_teams.hasMany(models.status_players, {as: "namesteams"}) // FK_userId
    }

    return names_teams
}
