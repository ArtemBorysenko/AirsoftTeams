const userDB = require("../models/user")
const DatabaseError = require("../errors/database-error")

async function getManager(id) {
    return userDB
        .getUserById(id)
        .then((user) => {
            if (!user || user.user_role !== "Manager") {
                throw new Error("Manager not found")
            }
            return user
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function getAllManagers() {
    return userDB
        .getAllByUser_role("Manager")
        .then((user) => {
            if (!user) {
                throw new Error("Managers not found")
            }
            return user
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function approvingManager(id, comment) {
    return userDB
        .getUserById(id)
        .then((user) => {
            if (!user || user.user_role !== "Manager") {
                throw new Error("Manager not found")
            }
            userDB.approving(user.id, comment)
            return "Менеджер подтвержден"
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function blockingManager(id, comment) {
    return userDB
        .getUserById(id)
        .then((user) => {
            if (!user || user.user_role !== "Manager") {
                throw new Error("Manager not found")
            }
            userDB.blocking(user.id, comment)
            return "Менеджер заблокирован"
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

module.exports = {
    getManager,
    getAllManagers,
    approvingManager,
    blockingManager,
}
