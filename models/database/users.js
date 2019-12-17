//const Sequelize = require('sequelize');
//const db = require('../../config/database');

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
        // созадет в таблцицу user {{ usercred + Id }} с таблциы user_cred id
        users.belongsTo(models.users_creds, {as: "usercred"})
        users.belongsTo(models.comments, {as: "comment"})
        users.belongsTo(models.names_teams, {as: "team"})
        users.hasMany(models.users_tokens, {as: "tokens"})
        users.hasOne(models.status_players, {as: "status"})
        //  users.belongsTo(models.status_players, { as: 'status' });
    }

    return users
}
