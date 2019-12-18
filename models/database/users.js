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

        users.hasOne(models.users_creds, {as: "usercred"}) // FK_userId
        users.hasMany(models.users_tokens, {as: "tokens"}) // FK_userId
        users.hasOne(models.comments, {as: "comment"}) // FK_userId
        users.hasMany(models.names_teams, {as: "team"}) // FK_userId
        users.hasOne(models.status_players, {as: "status"}) // FK_userId

        // users.belongsTo(models.users_creds, {as: "usercred"})
        // users.belongsTo(models.comments, {as: "comment"})
        // users.belongsTo(models.names_teams, {as: "team"})
        // users.hasMany(models.users_tokens, {as: "tokens"})
        // users.hasOne(models.status_players, {as: "status"})
        // //  users.belongsTo(models.status_players, { as: 'status' });
    }

    return users
}

//   Таблица users
//PK id
//username
//user_role
//isActive
//isBlocked
//
//
//

//   Таблица users_creds
//users.hasOne(models.users_creds, {as: "user"}) // FK_userId
//password
//
//
//
//
//

//   Таблица users_tokens
//users.hasMany(models.users_tokens, {as: "user"}) // FK_userId
//token
//refreshToken
//
//
//
//

//   Таблица comments
//users.hasOne(models.comments, {as: "user"}) // FK_userId
//blocked
//deleted
//actived
//
//
//

//   Таблица name_teams
//users.hasMany(models.name_teams, {as: "user"}) // FK_userId
//name
//
//
//
//
//
//

//   Таблица status__players
//users.hasOne(models.status__players, {as: "user"}) // FK_userId
//status__players.hasOne(models.name_teams, {as: "team"}) // FK_userId
//status
//
//
//
//
//
//
