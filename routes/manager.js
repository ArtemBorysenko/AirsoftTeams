const express = require("express")
const team = require("../controllers/team")
const player = require("../controllers/player")
const mail = require("../controllers/mailer")
const socketNtfc = require("../controllers/socketNotifications")
const config = require("../config")
const router = express.Router()

router.use((req, res, next) => {
    if (req.role !== "Manager") {
        res.status(401).json(req.role + " Доступ запрещен")
    }
    next()
})

router.get("/player/approve_team/:id", async (req, res, next) => {
    const error = player.approvingTeam(req.params.id)

    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        socketNtfc.ntfcApprove(req)
        await mail.mailer({
            from: '"Tetta App" <artemborysenco@gmail.com>',
            to: config.mailPlayer,
            subject: "player approve",
            text: "This is the email sent through Gmail SMTP Server.",
        })

        res.status(200).json(error)
    }
})

router.get("/player/", async (req, res, next) => {
    const error = await player.getAllPlayers()
    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        res.status(200).json(error)
    }
})

router.get("/player/:id", async (req, res, next) => {
    const error = await player.getPlayer(req.params.id)
    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        res.status(200).json(error)
    }
})

router.get("/team/:id", async (req, res, next) => {
    const error = await team.getPlayersByTeam(req.params.id)
    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        res.status(200).json(error)
    }
})

router.delete("/player/team/:id", async (req, res, next) => {
    const error = await player.deleteFromTeam(req.params.id)

    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        socketNtfc.ntfcDeleted(req, res, next)
        await mail.mailer({
            from: '"Tetta App" <artemborysenco@gmail.com>',
            to: config.mailPlayer,
            subject: "player left team",
            text: "This is the email sent through Gmail SMTP Server.",
        })

        res.status(200).json(error)
    }
})
module.exports = router
