module.exports = (sequelize, DataTypes) => {
    const teams_names = sequelize.define("teams_names", {
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

    teams_names.associate = function(models) {
        teams_names.hasMany(models.status_players, {
            as: "namesTeam",
            onDelete: "cascade",
        })
        teams_names.hasMany(models.users, {as: "team", onDelete: "cascade"})
    }

    return teams_names
}
