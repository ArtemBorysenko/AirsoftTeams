const express = require("express")
const cntrl = require("../controllers/auth")
const router = express.Router()

const {
    loginValidation,
    registerValidation,
} = require("../utils/validations/index")
const {validationResult} = require("express-validator")

router.post("/", loginValidation, async (req, res, next) => {
    const error = await cntrl.logIn(req.body.username, req.body.password)
    if (error instanceof Error) {
        res.status(400).json(error.message)
    } else {
        console.log(error)
        res.status(200).json(error)
    }
})

module.exports = router
