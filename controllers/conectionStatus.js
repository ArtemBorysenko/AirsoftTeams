const sequelize = require("../connections/database")

module.exports.getServerStatus = async function() {
    try {
        await sequelize.authenticate()
        return {PostgreSQL: "Соединение установлено"}
    } catch (err) {
        return {PostgreSQL: "Ошибка соединения" + err}
    }

    // return sequelize
    //     .authenticate()
    //     .then(() => {
    //         return {PostgreSQL: "Соединение установлено"}
    //     })
    //     .catch((err) => {
    //         return {PostgreSQL: "Ошибка соединения" + err}
    //     })
}
