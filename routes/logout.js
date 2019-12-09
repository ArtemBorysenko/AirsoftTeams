const express = require("express")
const cntrl = require("../controllers/auth")
const router = express.Router()

router.get("/", async (req, res, next) => {
    let token = req.headers.authorization
    token = token.slice(7, token.length)

    const error = await cntrl.logOut(token)

    if (error instanceof Error) {
        res.status(400).json(error.message)
    }
    console.log(error)
    res.status(200).json(error)
})

module.exports = router
