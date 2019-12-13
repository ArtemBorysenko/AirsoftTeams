const express = require("express")
const team = require("../controllers/team")
const player = require("../controllers/player")
const mail = require("../controllers/mailer")
const socketNtfc = require("../controllers/socketNotifications")
const config = require("../config")
const ServerError = require("../errors/server-error")
const router = express.Router()

router.use((req, res, next) => {
    if (req.role !== "Player") {
        throw new ServerError(`${req.role} Доступ запрещен`)
    }
    next()
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

router.get("/team/add/:id", async (req, res, next) => {
    try {
        const message = await team.addPlayerInTeam(req.id, req.params.id)

        socketNtfc.ntfcSwitch(req)

        await mail.mailer({
            from: '"Tetta TEST" <artemborysenco@gmail.com>',
            to: config.mailManager,
            subject: "player add",
            text: "This is the email sent through Gmail SMTP Server.",
        })

        res.status(200).json(message)
    } catch (e) {
        next(e)
    }
})

router.get("/switch/team/", async (req, res, next) => {
    try {
        const message = await team.switchTeam(req.id)

        socketNtfc.ntfcSwitch(req)

        await mail.mailer({
            from: '"Tetta TEST" <artemborysenco@gmail.com>',
            to: config.mailManager,
            subject: "player switch",
            text: "This is the email sent through Gmail SMTP Server.",
        })

        res.status(200).json(message)
    } catch (e) {
        next(e)
    }
})

router.post("/team/out/", async (req, res, next) => {
    try {
        const message = await team.outPlayerWithTeam(req.id, req.body.comment)

        socketNtfc.ntfcSwitch(req)

        await mail.mailer({
            from: '"Tetta TEST" <artemborysenco@gmail.com>',
            to: config.mailManager,
            subject: "player out",
            text: "This is the email sent through Gmail SMTP Server.",
        })

        res.status(200).json(message)
    } catch (e) {
        next(e)
    }
})

module.exports = router
