const {check} = require("express-validator")

module.exports = [
    check("username").isEmail(),
    check("password").isLength({min: 4}),
]
