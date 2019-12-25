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

    // return userDB
    //     .getUserById(id)
    //     .then((user) => {
    //         if (!user || user.user_role !== "Player") {
    //             throw new Error("Player not found")
    //         }
    //         return user
    //     })
    //     .catch((err) => {
    //         throw new DatabaseError(err)
    //     })
}

async function getAllPlayers() {
    return userDB
        .getAllByUser_role("Player")
        .then((user) => {
            if (!user) {
                throw new Error("Players not found")
            }
            return user
        })
        .catch((err) => {
            console.log(err)
            throw new DatabaseError(err)
        })
}

async function approvingPlayer(id, comment) {
    return userDB
        .getUserById(id)
        .then((user) => {
            if (!user || user.user_role !== "Player") {
                throw new Error("Player not found")
            }
            userDB.approvingUser(user.id, comment)
            return
            ;("Игрок подтвержден")
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function blockingPlayer(id, comment) {
    return userDB
        .getUserById(id)
        .then((user) => {
            if (!user || user.user_role !== "Player") {
                throw new Error("Player not found")
            }
            userDB.blockingUser(user.id, comment)
            return "Игрок заблокирован"
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function deleteUser(id) {
    try {
        const testDelete = await userDB.deleteUser(id)
        console.log("testDelete : ", testDelete)
        return "пользователь удален"
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function managerResponsTeam(id, status) {
    return userDB
        .getUserById(id)
        .then((user) => {
            if (!user || user.user_role !== "Player")
                throw new Error("Player not found")
            return teamDB.approvingTeam(id, status).then(() => {
                return `Team ${status}`
            })
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
    managerResponsTeam,
}
