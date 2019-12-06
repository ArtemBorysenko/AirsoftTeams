const {check} = require("express-validator")

module.exports = [
    check("username").isEmail(),
    check("username").isLength({min: 7}),
    check("password").isLength({min: 4}),
    check("user_role").isLength({min: 5}),
    check("team").isLength({max: 4}),
]
