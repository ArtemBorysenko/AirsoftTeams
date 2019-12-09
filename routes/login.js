const express = require("express")
const cntrl = require("../controllers/auth")
const router = express.Router()

const {loginValidation} = require("../utils/validations/index")
const {validationResult} = require("express-validator")

//Сделал TODO express alidator проверка логина на валидность на router
router.post("/", loginValidation, async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    } else {
        const error = await cntrl.logIn(req.body.username, req.body.password)

        if (error instanceof Error) {
            res.status(400).json(error.message)
        } else {
            res.status(200).json(error)
        }
    }
})

module.exports = router
