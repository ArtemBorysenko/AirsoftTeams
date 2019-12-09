const express = require("express")
const manager = require("../controllers/manager")
const player = require("../controllers/player")
const router = express.Router()

router.use((req, res, next) => {
    if (req.role !== "Admin") {
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

router.get("/manager/", async (req, res, next) => {
    const error = await manager.getAllManagers()
    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        res.status(200).json(error)
    }
})

router.get("/manager/:id", async (req, res, next) => {
    const error = await manager.getManager(req.params.id)
    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        res.status(200).json(error)
    }
})

router.post("/manager/approve/:id", async (req, res, next) => {
    const error = await manager.approvingManager(
        req.params.id,
        req.body.comment,
    )
    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        res.status(200).json(error)
    }
})

router.post("/manager/blocked/:id", async (req, res, next) => {
    const error = await manager.blockingManager(req.params.id, req.body.comment)
    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        res.status(200).json(error)
    }
})

router.post("/player/approve/:id", async (req, res, next) => {
    const error = await player.approvingPlayer(req.params.id, req.body.comment)
    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        res.status(200).json(error)
    }
})

router.post("/player/blocked/:id", async (req, res, next) => {
    const error = await player.blockingPlayer(req.params.id, req.body.comment)
    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        res.status(200).json(error)
    }
})

router.delete("/delete/:id", async (req, res, next) => {
    const error = await player.deleteUser(req.params.id)
    if (error instanceof Error) {
        res.status(400).json(error)
    } else {
        res.status(200).json(error)
    }
})

module.exports = router
