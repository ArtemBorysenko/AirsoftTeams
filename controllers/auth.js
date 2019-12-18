const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const uuid = require("uuid/v4")
const config = require("../config")
const db = require("../models/database/db")
const ServerError = require("../errors/server-error")
const DatabaseError = require("../errors/database-error")

async function logIn(username, password) {
    try {
        const user = await db.login(username, password)

        const {token, refreshToken} = await createToken(user)

        return await db.addToken(user.id, token, refreshToken)
    } catch (err) {
        throw new ServerError(err.message, 422, "Login error")
    }
}

async function logOut(token) {
    return await db.removeToken(token).catch((err) => {
        throw new DatabaseError(err)
    })
}

async function registration(req, res, next) {
    return await db
        .registration({
            username: req.body.username,
            user_role: req.body.user_role,
            //teamId: 1,
            isActive: req.body.isActive || false, // isActive = false
            isBlocked: false,
            usercred: {
                password: bcrypt.hashSync(
                    req.body.password,
                    bcrypt.genSaltSync(10),
                    null,
                ),
            },
            tokens: {
                token: null,
                refreshToken: null,
            },
            comment: {
                blocked: null,
                deleted: null,
                actived: null,
            },
            team: {
                name: req.body.team,
            },
            status: {
                status: "pending",
                //namesTeamsId: 1
            },
        })
        .catch((err) => {
            throw new ServerError(err.message, 422, "Registration error")
        })
}

async function refreshToken(userRefreshToken) {
    try {
        const user = await db.newRefreshToken(userRefreshToken)

        const {token, refreshToken} = await createToken(user)

        return await db.addToken(user.id, token, refreshToken)
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
