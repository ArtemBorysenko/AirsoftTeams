module.exports = (sequelize, DataTypes) =>
{
    const users_tokens = sequelize.define('users_tokens', {
        token: {
            type: DataTypes.STRING
        },
        refreshToken: {
            type: DataTypes.STRING
        }
    });
    return users_tokens;
}