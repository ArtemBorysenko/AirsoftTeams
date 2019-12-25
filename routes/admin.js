const express = require("express")
const manager = require("../controllers/manager")
const player = require("../controllers/player")
const ServerError = require("../errors/server-error")
const router = express.Router()

router.use((req, res, next) => {
    if (req.role !== "Admin") {
        throw new ServerError(`${req.role} Доступ запрещен`, 403)
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

router.get("/manager/", async (req, res, next) => {
    try {
        res.status(200).json(await manager.getAllManagers())
    } catch (e) {
        next(e)
    }
})

router.get("/manager/:id", async (req, res, next) => {
    try {
        res.status(200).json(await manager.getManager(req.params.id))
    } catch (e) {
        next(e)
    }
})

router.post("/manager/approve/:id", async (req, res, next) => {
    try {
        res.status(200).json(
            await manager.approvingManager(req.params.id, req.body.comment),
        )
    } catch (e) {
        next(e)
    }
})

router.post("/manager/blocked/:id", async (req, res, next) => {
    try {
        res.status(200).json(
            await manager.blockingManager(req.params.id, req.body.comment),
        )
    } catch (e) {
        next(e)
    }
})

router.post("/player/approve/:id", async (req, res, next) => {
    try {
        // TODO проверку на ошибку
        // teams_names
        res.status(200).json(
            await player.approvingPlayer(req.params.id, req.body.comment),
        )
    } catch (e) {
        next(e)
    }
})

router.post("/player/blocked/:id", async (req, res, next) => {
    try {
        res.status(200).json(
            await player.blockingPlayer(req.params.id, req.body.comment),
        )
    } catch (e) {
        next(e)
    }
})

router.delete("/delete/:id", async (req, res, next) => {
    try {
        res.status(200).json(await player.deleteUser(req.params.id))
    } catch (e) {
        next(e)
    }
})

module.exports = router
