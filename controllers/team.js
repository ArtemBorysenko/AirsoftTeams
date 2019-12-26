const userDB = require("../models/user")
const teamDB = require("../models/team")

const DatabaseError = require("../errors/database-error")

async function getPlayersByTeam(id) {
    try {
        //TODO if(getAllPlayersByTeam === 0 ) error
        return teamDB.getAllPlayersByTeam(id)
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function addPlayerInTeam(userId, teamName) {
    try {
        const user = await userDB.getUserById(userId)
        if (!user || user.user_role !== "Player")
            throw new Error("Player not found")
        const applyAdditionTeam = await teamDB.applyAdditionTeam(
            user.id,
            teamName,
        )
        //TODO if(applyAdditionTeam === 0)
        return "Запрос отправлен"
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function deleteFromTeam(id, comment) {
    try {
        const user = await userDB.getUserById(id)
        if (!user || user.user_role !== "Player")
            throw new Error("Player not found")
        const deleteTeam = await teamDB.deleteTeam(user.id, comment)
        if (deleteTeam === 0) throw new Error("Player not found") //TODO
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
