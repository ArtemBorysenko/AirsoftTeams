const express = require("express")
const team = require("../../controllers/team")
const player = require("../../controllers/player")
const mail = require("../../controllers/mailer")
const socketNtfc = require("../../controllers/socketNotifications")
const config = require("../../config")
const ServerError = require("../../errors/server-error")
const router = express.Router()

router.use((req, res, next) => {
    if (req.role !== "Manager") {
        throw new ServerError(`${req.role} Доступ запрещен`, 403)
    }
    next()
})

router.get("/player", async (req, res, next) => {
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
        const message = await team.deleteFromTeam(
            req.params.id,
            req.body.comment,
        )

        socketNtfc.ntfcDeleted(req, res, next)

        await mail.mailer({
            from: '"Tetta TEST" <artemborysenco@gmail.com>',
            to: config.mailPlayer,
            subject: "player left team",
            text: "This is the email sent through Gmail SMTP Server.",
        })

        res.status(200).json(message)
    } catch (e) {
        next(e)
    }
})

router.get("/player/approve_team/:id", async (req, res, next) => {
    try {
        const message = await player.managerResponsTeam(
            req.params.id,
            "Approved",
        )

        socketNtfc.ntfcApprove(req)

        await mail.mailer({
            from: '"Tetta TEST" <artemborysenco@gmail.com>',
            to: config.mailPlayer,
            subject: "player approve",
            text: "This is the email sent through Gmail SMTP Server.",
        })

        res.status(200).json(message)
    } catch (e) {
        next(e)
    }
})

router.get("/player/decline_team/:id", async (req, res, next) => {
    try {
        const message = await player.managerResponsTeam(
            req.params.id,
            "Declined",
        )

        socketNtfc.ntfcApprove(req)

        await mail.mailer({
            from: '"Tetta TEST" <artemborysenco@gmail.com>',
            to: config.mailPlayer,
            subject: "decline_team",
            text: "This is the email sent through Gmail SMTP Server.",
        })

        res.status(200).json(message)
    } catch (e) {
        next(e)
    }
})

module.exports = router
