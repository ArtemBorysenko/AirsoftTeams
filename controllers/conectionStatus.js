const sequelize = require("../connections/database")

module.exports.getServerStatus = function() {
    return sequelize
        .authenticate()
        .then(() => {
            return {PostgreSQL: "Соединение установлено"}
        })
        .catch((err) => {
            return {PostgreSQL: "Ошибка соединения" + err}
        })
}
