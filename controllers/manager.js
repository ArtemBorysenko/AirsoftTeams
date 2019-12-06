const db = require("../models/database/db")

async function getManager(req, res) {
    // TODO return straint в route ответы переснести в роутер
    db.getById(req.params.id)
        .then((results) => {
            if (results && results.user_role === "Manager") {
                res.json(results)
            } else {
                res.status(400).json({err: "Manager not found"})
            }
        })
        .catch((err) => {
            res.status(400).json({err: err.message})
        })
}

async function getAllManagers(req, res) {
    db.getAllByUser_role("Manager")
        .then((results) => {
            if (results) {
                res.json(results)
            } else {
                res.status(400).json({err: "Managers not found"})
            }
        })
        .catch((err) => {
            res.status(400).json({err: err.message})
        })
}

async function approvingManager(req, res, next) {
    db.getById(req.params.id)
        .then((user) => {
            if (user && user.user_role === "Manager") {
                db.approving(req.params.id, req.body.comment)
                res.send("Менеджер подтвержден")
                next()
            } else {
                res.status(400).json({err: "Manager not found"})
            }
        })
        .catch((err) => {
            res.status(400).json({err: err.message})
        })
}

async function blockingManager(req, res) {
    db.getById(req.params.id)
        .then((user) => {
            if (user && user.user_role === "Manager") {
                db.blocking(req.params.id, req.body.comment)
                res.send("Менеджер заблокирован")
            } else {
                res.status(400).json({err: "Manager not found"})
            }
        })
        .catch((err) => {
            res.status(400).json({err: err.message})
        })
}

async function deleteManager(req, res) {
    db.deleteUser(req.params.id)
    res.send("Менеджер удален")
}

module.exports = {
    getManager,
    getAllManagers,
    approvingManager,
    blockingManager,
    deleteManager,
}
