const db = require("../models/database/db")

async function getManager(id) {
    // Сделал TODO return strint в route ответы переснести в роутер
    return db
        .getById(id)
        .then((user) => {
            if (user && user.user_role === "Manager") {
                return user
            } else {
                return new Error("Manager not found")
            }
        })
        .catch((err) => {
            return new Error("Manager not found" + err)
        })
}

async function getAllManagers() {
    return db
        .getAllByUser_role("Manager")
        .then((user) => {
            if (user) {
                return user
            } else {
                return new Error("Managers not found")
            }
        })
        .catch((err) => {
            return new Error("Managers not found" + err)
        })
}

async function approvingManager(id, comment) {
    return db
        .getById(id)
        .then((user) => {
            if (user && user.user_role === "Manager") {
                db.approving(user.id, comment)
                return "Менеджер подтвержден"
            } else {
                return new Error("Manager not found")
            }
        })
        .catch((err) => {
            return new Error("Manager not found" + err)
        })
}

async function blockingManager(id, comment) {
    return db
        .getById(id)
        .then((user) => {
            if (user && user.user_role === "Manager") {
                db.blocking(user.id, comment)
                return "Менеджер заблокирован"
            } else {
                return new Error("Manager not found")
            }
        })
        .catch((err) => {
            return new Error("Manager not found" + err)
        })
}

async function deleteManager(req, res) {
    db.deleteUser(req.params.id)
    return "Менеджер удален"
}

module.exports = {
    getManager,
    getAllManagers,
    approvingManager,
    blockingManager,
    deleteManager,
}
