const userDB = require("../models/user")
const teamDB = require("../models/team")

const DatabaseError = require("../errors/database-error")

async function getPlayer(id) {
    try {
        const user = await userDB.getUserById(id)
        if (!user || user.user_role !== "Player")
            throw new Error("Player not found")
        return user
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function getAllPlayers() {
    try {
        const user = await userDB.getAllByUser_role("Player")
        if (!user) throw new Error("Players not found")
        return user
    } catch (err) {
        throw new DatabaseError(err, 501)
    }
}

async function approvingPlayer(id, comment) {
    // TODO проверку на ошибку
    try {
        const user = await userDB.getUserById(id)
        if (!user || user.user_role !== "Player")
            throw new Error("Player not found")
        const approvingUser = await userDB.approvingUser(user.id, comment)
        if (approvingUser === 0) throw new Error("Player not found") //TODO sequelize === 0 error
        return "Игрок подтвержден"
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function blockingPlayer(id, comment) {
    try {
        const user = await userDB.getUserById(id)
        if (!user || user.user_role !== "Player")
            throw new Error("Player not found")
        const blockingUser = await userDB.blockingUser(user.id, comment)
        if (blockingUser)
            //TODO sequelize === 0 error
            return "Игрок заблокирован"
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function deleteUser(id) {
    try {
        await userDB.deleteUser(id)
        return "пользователь удален"
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function managerResponsTeam(id, status) {
    try {
        const user = await userDB.getUserById(id)
        if (!user || user.user_role !== "Player")
            throw new Error("Player not found")
        const approvingTeam = await teamDB.approvingTeam(id, status)
        if (approvingTeam)
            //TODO sequelize === 0 error
            return `Team ${status}`
    } catch (err) {
        throw new DatabaseError(err)
    }
}

module.exports = {
    getPlayer,
    getAllPlayers,
    approvingPlayer,
    blockingPlayer,
    deleteUser,
    managerResponsTeam,
}
