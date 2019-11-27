module.exports = (sequelize, DataTypes) =>
{
    const comments = sequelize.define('comments', {
        blocked: {
            type: DataTypes.STRING
        },
        deleted: {
            type: DataTypes.STRING
        },
        actived: {
            type: DataTypes.STRING
        }
    });
    return comments;
}