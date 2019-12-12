const express = require("express")
const team = require("../controllers/team")
const player = require("../controllers/player")
const mail = require("../controllers/mailer")
const socketNtfc = require("../controllers/socketNotifications")
const config = require("../config")
const router = express.Router()

router.use((req, res, next) => {
    if (req.role !== "Manager") {
        res.status(403).json(req.role + " Доступ запрещен")
    }
    next()
})

router.get("/player/approve_team/:id", async (req, res, next) => {
    try {
        const message = await player.approvingTeam(req.params.id)

        socketNtfc.ntfcApprove(req)

        await mail.mailer({
            from: '"Tetta App" <artemborysenco@gmail.com>',
            to: config.mailPlayer,
            subject: "player approve",
            text: "This is the email sent through Gmail SMTP Server.",
        })

        res.status(200).json(message)
    } catch (e) {
        next(e)
    }
})

router.get("/player/", async (req, res, next) => {
    try {
        res.status(200).json(await player.getAllPlayers())
    } catch (e) {
        next(e)
    }
})

router.get("/player/:id", async (req, res, next) => {
    try {
        res.status(200).json(await player.getPlayer(req.params.id))
    } catch (e) {
        next(e)
    }
})

router.get("/team/:id", async (req, res, next) => {
    try {
        res.status(200).json(await team.getPlayersByTeam(req.params.id))
    } catch (e) {
        next(e)
    }
})

router.delete("/player/team/:id", async (req, res, next) => {
    try {
        const message = await player.deleteFromTeam(req.params.id)

        socketNtfc.ntfcDeleted(req, res, next)

        await mail.mailer({
            from: '"Tetta App" <artemborysenco@gmail.com>',
            to: config.mailPlayer,
            subject: "player left team",
            text: "This is the email sent through Gmail SMTP Server.",
        })

        res.status(200).json(message)
    } catch (e) {
        next(e)
    }
})
module.exports = router
