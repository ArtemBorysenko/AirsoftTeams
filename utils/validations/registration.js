const {check} = require("express-validator")

module.exports = [
    check("username")
        .isEmail()
        .withMessage("must be Email"),
    check("username")
        .isLength({min: 7})
        .withMessage("must be at least 4 chars long"),
    check("password")
        .isLength({min: 4})
        .withMessage("must be at least 4 chars long"),
    check("user_role")
        .isLength({min: 5})
        .withMessage("must be at least 5 chars long"),
    check("team")
        .isLength({max: 6})
        .withMessage("must be equal 'want A', 'want B'"),
]
