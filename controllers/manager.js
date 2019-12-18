const db = require("../models/db")
const DatabaseError = require("../errors/database-error")

async function getManager(id) {
    return db
        .getById(id)
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
    return db
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
    return db
        .getById(id)
        .then((user) => {
            if (!user || user.user_role !== "Manager") {
                throw new Error("Manager not found")
            }
            db.approving(user.id, comment)
            return "Менеджер подтвержден"
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function blockingManager(id, comment) {
    return db
        .getById(id)
        .then((user) => {
            if (!user || user.user_role !== "Manager") {
                throw new Error("Manager not found")
            }
            db.blocking(user.id, comment)
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
