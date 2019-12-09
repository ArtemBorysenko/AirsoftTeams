const db = require("../models/database/db")

async function getPlayer(id) {
    return db
        .getById(id)
        .then((user) => {
            if (user && user.user_role === "Player") {
                return user
            } else {
                return new Error("Player not found")
            }
        })
        .catch((err) => {
            return new Error("Player not found" + err)
        })
}

async function getAllPlayers() {
    return await db
        .getAllByUser_role("Player")
        .then((user) => {
            if (user) {
                return user
            } else {
                return new Error("Игроки не найдены")
            }
        })
        .catch((err) => {
            return new Error("Ошибка с БД " + err)
        })
}

async function approvingPlayer(id, comment) {
    return db
        .getById(id)
        .then((user) => {
            if (user && user.user_role === "Player") {
                db.approving(user.id, comment)
                return "Игрок подтвержден"
            } else {
                return new Error("Player not found")
            }
        })
        .catch((err) => {
            return new Error("Player not found" + err)
        })
}

async function blockingPlayer(id, comment) {
    return db
        .getById(id)
        .then((user) => {
            if (user && user.user_role === "Player") {
                db.blocking(user.id, comment)
                return "Игрок заблокирован"
            } else {
                return new Error("Player not found")
            }
        })
        .catch((err) => {
            return new Error("Player not found" + err)
        })
}

async function deleteUser(id) {
    db.deleteUser(id)
    return res.send("пользователь удален")
}

async function deleteFromTeam(id) {
    return db
        .getById(id)
        .then((user) => {
            if (user && user.user_role === "Player") {
                db.deleteTeam(id, null)
                return "Игрок удален из команды"
            } else {
                return new Error("Player not found")
            }
        })
        .catch((err) => {
            return new Error("Player not found" + err)
        })
}

async function approvingTeam(id) {
    return db
        .getById(id)
        .then((user) => {
            if (user && user.user_role === "Player") {
                if (user.team === "want A") db.approvingTeam(id, "A")
                if (user.team === "want B") db.approvingTeam(id, "B")
                return "команда изменена"
            } else {
                return new Error("Player not found")
            }
        })
        .catch((err) => {
            return new Error("Player not found" + err)
        })
}

module.exports = {
    getPlayer,
    getAllPlayers,
    approvingPlayer,
    blockingPlayer,
    deleteUser,
    deleteFromTeam,
    approvingTeam,
}
