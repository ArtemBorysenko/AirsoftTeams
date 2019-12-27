const userDB = require("../models/user")
const DatabaseError = require("../errors/database-error")

async function getManager(id) {
    try {
        const user = await userDB.getUserById(id)
        if (!user || user === 0 || user.user_role !== "Manager")
            throw new Error("Manager not found")
        return user
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function getAllManagers() {
    try {
        const user = await userDB.getAllByUser_role("Manager")
        if (!user || user === 0) throw new Error("Managers not found")
        return user
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function approvingManager(id, comment) {
    try {
        const user = await userDB.getUserById(id)
        if (!user || user.user_role !== "Manager" || user === 0)
            throw new Error("Manager not found")
        const approving = await userDB.approving(user.id, comment)
        if (approving === 0) throw new Error("Manager not found")
        return "Менеджер подтвержден"
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function blockingManager(id, comment) {
    try {
        const user = await userDB.getUserById(id)
        if (!user || user.user_role !== "Manager" || user === 0)
            throw new Error("Manager not found")
        const blocking = await userDB.blocking(user.id, comment)
        if (blocking === 0) throw new Error("Manager not found")
        return "Менеджер заблокирован"
    } catch (err) {
        throw new DatabaseError(err)
    }
}

module.exports = {
    getManager,
    getAllManagers,
    approvingManager,
    blockingManager,
}
