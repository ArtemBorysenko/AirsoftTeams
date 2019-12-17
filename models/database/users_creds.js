module.exports = (sequelize, DataTypes) => {
    const users_creds = sequelize.define("users_creds", {
        password: {
            type: DataTypes.STRING,
        },
    })
    return users_creds
}
