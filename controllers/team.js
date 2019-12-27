const userDB = require("../models/user")
const teamDB = require("../models/team")

const DatabaseError = require("../errors/database-error")

async function getPlayersByTeam(id) {
    try {
        const getAllPlayersByTeam = await teamDB.getAllPlayersByTeam(id)
        if (getAllPlayersByTeam === 0) Error("Player not found")
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function addPlayerInTeam(userId, teamName) {
    try {
        const user = await userDB.getUserById(userId)
        if (!user || user.user_role !== "Player" || user === 0)
            throw new Error("Player not found")
        const applyAdditionTeam = await teamDB.applyAdditionTeam(
            user.id,
            teamName,
        )
        if (applyAdditionTeam === 0) throw new Error("Player not found")
        return "Запрос отправлен"
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function deleteFromTeam(id, comment) {
    try {
        const user = await userDB.getUserById(id)
        if (!user || user.user_role !== "Player" || user === 0)
            throw new Error("Player not found")
        const deleteTeam = await teamDB.deleteTeam(user.id, comment)
        deleteTeam.forEach((element) => {
            if (element === 0) throw new Error("Player not found")
        })
        return "Игрок удален из команды"
    } catch (err) {
        throw new DatabaseError(err)
    }
}

module.exports = {
    getPlayersByTeam,
    addPlayerInTeam,
    deleteFromTeam,
}
