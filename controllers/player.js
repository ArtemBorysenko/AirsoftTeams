const db = require("../models/database/db")
const DatabaseError = require("../errors/database-error")

async function getPlayer(id) {
    return db
        .getById(id)
        .then((user) => {
            if (!user || user.user_role !== "Player") {
                throw new Error("Player not found")
            }
            return user
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function getAllPlayers() {
    return await db
        .getAllByUser_role("Player")
        .then((user) => {
            if (!user) {
                throw new Error("Players not found")
            }
            return user
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function approvingPlayer(id, comment) {
    return db
        .getById(id)
        .then((user) => {
            if (!user || user.user_role !== "Player") {
                throw new Error("Player not found")
            }
            db.approving(user.id, comment)
            return "Игрок подтвержден"
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function blockingPlayer(id, comment) {
    return db
        .getById(id)
        .then((user) => {
            if (!user || user.user_role !== "Player") {
                throw new Error("Player not found")
            }
            db.blocking(user.id, comment)
            return "Игрок заблокирован"
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function deleteUser(id) {
    try {
        db.deleteUser(id)
        return "пользователь удален"
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function deleteFromTeam(id) {
    return db
        .getById(id)
        .then((user) => {
            if (!user || user.user_role !== "Player") {
                throw new Error("Player not found")
            }
            db.deleteTeam(id, null)
            return "Игрок удален из команды"
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function approvingTeam(id) {
    return db
        .getById(id)
        .then((user) => {
            if (!user || user.user_role !== "Player") {
                throw new Error("Player not found")
            }
            if (user.team === "want A") db.approvingTeam(id, "A")
            if (user.team === "want B") db.approvingTeam(id, "B")
            return "команда изменена"
        })
        .catch((err) => {
            throw new DatabaseError(err)
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
