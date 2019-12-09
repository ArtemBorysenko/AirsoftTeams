const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const uuid = require("uuid/v4")
const config = require("../config")
const db = require("../models/database/db")

async function logIn(username, password) {
    const user = await db.login(username, password)

    const {token, refreshToken} = await createToken(user)

    if (user instanceof Error) {
        return user
    } else {
        return await db.addToken(user.id, token, refreshToken)
    }
}

async function logOut(token) {
    return await db.removeToken(token)
}

async function registration(req, res, next) {
    const newUser = await db.registration({
        username: req.body.username,
        user_role: req.body.user_role,
        team: req.body.team,
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
    })

    return await newUser
}

async function refreshToken(userRefreshToken) {
    const user = await db.newRefreshToken(userRefreshToken)

    const {token, refreshToken} = await createToken(user)

    if (user instanceof Error) {
        return user
    } else {
        return await db.addToken(user.id, token, refreshToken)
    }
}

async function createToken(user) {
    const refreshToken = uuid()
    const token = jwt.sign(
        // Сделал TODO вынести из моделей все что не касается БД
        // проверки ответов БД
        // перенести в роутеры все
        // return res.status(400).json({err: err.message});
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
