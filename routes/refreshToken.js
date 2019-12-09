const express = require("express")
const cntrl = require("../controllers/auth")
const router = new express.Router()

router.post("/", async (req, res, next) => {
    const error = await cntrl.refreshToken(req.body.refreshToken)

    if (error instanceof Error) {
        res.status(400).json(error.message)
    }
    res.status(200).json(error)
})

module.exports = router
