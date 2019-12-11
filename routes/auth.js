const express = require("express")
const cntrl = require("../controllers/auth")
const mail = require("../controllers/mailer")
const socketNtfc = require("../controllers/socketNotifications")
const router = express.Router()
const config = require("../config")

const {
    registerValidation,
    loginValidation,
} = require("../utils/validations/index")
const {validationResult} = require("express-validator")

router.post("/registration/", registerValidation, async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    try {
        const message = await cntrl.registration(req, res)
        socketNtfc.ntfcReg(req)

        if (req.body.user_role === "Manager") {
            await mail.mailer({
                from: '"Tetta App" <artemborysenco@gmail.com>',
                to: config.mailAdmin,
                subject: `Manager ${req.body.username} is registrated`,
                text: "This is the email sent through Gmail SMTP Server.",
            })
        }
        res.status(200).json(message)
    } catch (e) {
        next(e)
    }
})

router.post("/login/", loginValidation, async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    try {
        res.status(200).json(
            await cntrl.logIn(req.body.username, req.body.password),
        )
    } catch (e) {
        next(e)
    }
})

router.get("/logout/", async (req, res, next) => {
    try {
        let token = req.headers.authorization
        token = token.slice(7, token.length)
        res.status(200).json(await cntrl.logOut(token))
    } catch (e) {
        next(e)
    }
})

router.post("/refreshtoken/", async (req, res, next) => {
    try {
        res.status(200).json(await cntrl.refreshToken(req.body.refreshToken))
    } catch (e) {
        next(e)
    }
})

module.exports = router
