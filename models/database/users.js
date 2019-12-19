module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        user_role: {
            type: DataTypes.ENUM("Player", "Manager", "Admin"),
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
        },
    })

    users.associate = function(models) {
        users.hasOne(models.users_creds, {as: "userCred"})
        users.hasMany(models.users_tokens, {as: "token"})
        users.hasOne(models.comments, {as: "userComment"})
        users.hasOne(models.status_players, {as: "user"})
    }
    return users
}
