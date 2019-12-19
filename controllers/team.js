const userDB = require("../models/user")
const teamDB = require("../models/team")

const DatabaseError = require("../errors/database-error")

async function getPlayersByTeam(id) {
    return teamDB.getAllPlayersByTeam(id).catch((err) => {
        throw new DatabaseError(err)
    })
}

async function addPlayerInTeam(userId, teamName) {
    return userDB
        .getUserById(userId)
        .then(async (user) => {
            if (!user || user.user_role !== "Player") {
                throw new Error("Player not found")
            }
            await teamDB.applyAdditionTeam(user.id, teamName)
            return "Запрос отправлен"
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function deleteFromTeam(id, comment) {
    return userDB
        .getUserById(id)
        .then((user) => {
            if (!user || user.user_role !== "Player") {
                throw new Error("Player not found")
            }
            teamDB.deleteTeam(user.id, comment)
            return "Игрок удален из команды"
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

module.exports = {
    getPlayersByTeam,
    addPlayerInTeam,
    deleteFromTeam,
}
