const express = require("express")
const router = express.Router()
const jwtMiddleware = require("express-jwt")
const jwt = require("jsonwebtoken")
const config = require("../../config")

const routerAdmin = require("./admin")
const routerManager = require("./manager")
const routerPlayer = require("./player")
const routerAuth = require("./auth")

router.use("/auth", routerAuth)
router.use(
    jwtMiddleware({
        secret: config.secret,
    }),
    (req, res, next) => {
        let token = req.headers.authorization
        token = token.slice(7, token.length)
        const decoded = jwt.decode(token)
        if (decoded.isBlocked === true || decoded.isActive === false) {
            throw new Error("Пользователь заблокирован")
        }
        req.username = decoded.username
        req.id = decoded.id
        req.role = decoded.role
        req.isBlocked = decoded.isBlocked
        req.isActive = decoded.isActive
        next()
    },
)
router.use("/admin", routerAdmin)
router.use("/manager", routerManager)
router.use("/player", routerPlayer)

module.exports = router
