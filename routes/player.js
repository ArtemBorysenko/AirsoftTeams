const express = require("express")
const team = require("../controllers/team")
const player = require("../controllers/player")
const mail = require("../controllers/mailer")
const socketNtfc = require("../controllers/socketNotifications")
const config = require("../config")
const router = express.Router()

router.use((req, res, next) => {
    if (req.role !== "Player") {
        res.status(401).json(req.role + " Доступ запрещен")
    }
    next()
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

router.get("/team/add/:id", async (req, res, next) => {
    const error = await team.addPlayerInTeam(req.id, req.params.id)

    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        socketNtfc.ntfcSwitch(req)
        await mail.mailer({
            from: '"Tetta App" <artemborysenco@gmail.com>',
            to: config.mailManager,
            subject: "player add",
            text: "This is the email sent through Gmail SMTP Server.",
        })

        res.status(200).json(error)
    }
})

router.get("/team/switch/:id", async (req, res, next) => {
    const error = await team.switchTeam(req.params.id)

    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        socketNtfc.ntfcSwitch(req)
        await mail.mailer({
            from: '"Tetta App" <artemborysenco@gmail.com>',
            to: config.mailManager,
            subject: "player switch",
            text: "This is the email sent through Gmail SMTP Server.",
        })

        res.status(200).json(error)
    }
})

router.post("/team/out/", async (req, res, next) => {
    const error = await team.outPlayerWithTeam(req.id, req.body.comment)

    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        socketNtfc.ntfcSwitch(req)
        await mail.mailer({
            from: '"Tetta App" <artemborysenco@gmail.com>',
            to: config.mailManager,
            subject: "player out",
            text: "This is the email sent through Gmail SMTP Server.",
        })

        res.status(200).json(error)
    }
})

module.exports = router
