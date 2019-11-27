//const Sequelize = require('sequelize');
//const db = require('../../config/database');

module.exports = (sequelize, DataTypes) =>
{
    const users = sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        user_role: {
            type: DataTypes.ENUM('Player', 'Manager', 'Admin')
        },
        team: {
            type: DataTypes.ENUM('A', 'B', 'want A', 'want B')
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
        }
    });

    users.associate = function (models) {
        users.belongsTo(models.users_creds, { as: 'usercred' });
        users.belongsTo(models.comments, { as: 'comment' });
        users.hasMany(models.users_tokens, { as: 'tokens' });
    };

    return users;
}