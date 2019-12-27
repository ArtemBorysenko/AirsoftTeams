const userDB = require("../models/user")
const teamDB = require("../models/team")

const DatabaseError = require("../errors/database-error")

async function getPlayer(id) {
    try {
        const user = await userDB.getUserById(id)
        if (!user || user.user_role !== "Player" || user === 0)
            throw new Error("Player not found")
        return user
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function getAllPlayers() {
    try {
        const user = await userDB.getAllByUser_role("Player")
        if (!user || user === 0) throw new Error("Players not found")
        return user
    } catch (err) {
        throw new DatabaseError(err, 501)
    }
}

async function approvingPlayer(id, comment) {
    try {
        const user = await userDB.getUserById(id)
        if (!user || user.user_role !== "Player" || user === 0)
            throw new Error("Player not found")
        const approvingUser = await userDB.approvingUser(user.id, comment)
        approvingUser.forEach((element) => {
            if (element === 0) throw new Error("Player not found")
        })
        return "Игрок подтвержден"
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function blockingPlayer(id, comment) {
    try {
        const user = await userDB.getUserById(id)
        if (!user || user.user_role !== "Player" || user === 0)
            throw new Error("Player not found")
        const blockingUser = await userDB.blockingUser(user.id, comment)
        blockingUser.forEach((element) => {
            if (element === 0) throw new Error("Player not found")
        })
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
        if (!user || user.user_role !== "Player" || user === 0)
            throw new Error("Player not found")
        const approvingTeam = await teamDB.approvingTeam(id, status)
        if (approvingTeam === 0) throw new Error("Player not found")
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
