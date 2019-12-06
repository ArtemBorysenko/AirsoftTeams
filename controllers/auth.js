const db = require("../models/database/db")

async function logIn(username, password) {
    // TODO express alidator проверка логина на валидность на router
    const newUser = await db.login(username, password)

    const refreshToken = uuid()
    const token = jwt.sign(
        // TODO вынести из моделей все что не касается БД
        // TODO проверки ответов БД
        // TODO перенести в роутеры все
        //   return res.status(400).json({err: err.message});

        {
            username: user.username,
            id: user.id,
            role: user.user_role,
            isBlocked: user.isBlocked,
            isActive: user.isActive,
        },
        config.secret,
        config.time,
    )

    if (newUser instanceof Error) {
        return newUser
    } else {
        return newUser
    }
}

async function logOut(req, res) {
    await db.removeToken(req.id)
}

async function registration(req, res, next) {
    const newUser = await db.registration({
        username: req.body.username,
        password: req.body.password,
        user_role: req.body.user_role,
        team: req.body.team,
        isActive: req.body.isActive,
    })

    if (newUser instanceof Error) {
        return newUser
    }
}

async function refreshToken(req, res) {
    await db.newRefreshToken(req.body.refreshToken, res)
}

module.exports = {
    registration,
    logIn,
    logOut,
    refreshToken,
}
