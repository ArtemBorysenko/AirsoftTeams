const {check} = require("express-validator")

module.exports = [
    check("username")
        .isEmail()
        .withMessage("must be Email"),
    check("password")
        .isLength({min: 4})
        .withMessage("must be at least 4 chars long"),
]
