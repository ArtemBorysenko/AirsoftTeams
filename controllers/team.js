const db = require("../models/database/db")

async function getPlayersByTeam(id) {
    return db
        .getAllByTeam(id)
        .then((user) => {
            if (user) {
                return user
            } else {
                return new Error("Team not found")
            }
        })
        .catch((err) => {
            return new Error("Team not found" + err)
        })
}

async function addPlayerInTeam(userId, teamId) {
    return db
        .getById(userId)
        .then((user) => {
            if (
                user &&
                user.user_role === "Player" &&
                user.team !== "A" &&
                user.team !== "B"
            ) {
                db.changeTeam(user.id, teamId)
                return "Запрос отправлен"
            } else {
                return new Error("Ошибка при отправке запроса")
            }
        })
        .catch((err) => {
            return new Error("Ошибка при отправке запроса" + err)
        })
}

async function outPlayerWithTeam(id, comment) {
    return db
        .getById(id)
        .then((user) => {
            if (user && user.user_role === "Player") {
                db.deleteTeam(user.id, comment)
                return "Игрок покинул команду"
            } else {
                return new Error("Team not found")
            }
        })
        .catch((err) => {
            return new Error("Team not found" + err)
        })
}

async function switchTeam(id) {
    return db
        .getById(id)
        .then((user) => {
            if (user && user.user_role === "Player") {
                if (user.team === "A") db.changeTeam(user.id, "B")
                if (user.team === "B") db.changeTeam(user.id, "A")
                if (user.team !== "B" && user.team !== "A")
                    res.json(`${user.username} не входит в команду`)
                return "Запрос отправлен"
            } else {
                return new Error("Team not found")
            }
        })
        .catch((err) => {
            return new Error("Team not found" + err)
        })
}

module.exports = {
    getPlayersByTeam,
    addPlayerInTeam,
    outPlayerWithTeam,
    switchTeam,
}
