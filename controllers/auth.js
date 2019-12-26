const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const uuid = require("uuid/v4")
const config = require("../config")
const authDB = require("../models/auth")
const tokenDB = require("../models/token")
const ServerError = require("../errors/server-error")
const DatabaseError = require("../errors/database-error")

async function logIn(username, password) {
    try {
        const user = await authDB.login(username, password)

        const {token, refreshToken} = await createToken(user)

        return await tokenDB.addToken(user.id, token, refreshToken)
    } catch (err) {
        throw new ServerError(err.message, 422, "Login error")
    }
}

async function logOut(token) {
    try {
        return await tokenDB.removeToken(token)
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function registration(req, res, next, id) {
    try {
        return await authDB.registration({
            id: req.body.id,
            username: req.body.username,
            user_role: req.body.user_role,
            isActive: req.body.isActive || false, // isActive = false
            isBlocked: false,
            userCred: {
                id: req.body.id,
                password: bcrypt.hashSync(
                    req.body.password,
                    bcrypt.genSaltSync(10),
                    null,
                ),
            },
            token: {
                id: req.body.id,
                token: null,
                refreshToken: null,
            },
            userComment: {
                id: req.body.id,
                blocked: null,
                deleted: null,
                actived: null,
            },
            user: {},
        })
    } catch (err) {
        throw new ServerError(err.message, 422, "Registration error")
    }
}

async function refreshToken(userRefreshToken) {
    try {
        const user = await tokenDB.newRefreshToken(userRefreshToken)

        const {token, refreshToken} = await createToken(user)

        return await tokenDB.addToken(user.id, token, refreshToken)
    } catch (err) {
        throw new DatabaseError(err)
    }
}

async function createToken(user) {
    const refreshToken = uuid()
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.user_role,
            isBlocked: user.isBlocked,
            isActive: user.isActive,
        },
        config.secret,
        config.time,
    )
    return {
        token,
        refreshToken,
    }
}

module.exports = {
    registration,
    logIn,
    logOut,
    refreshToken,
}
