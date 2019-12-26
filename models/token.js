const sequelize = require("../connections/database")

async function addToken(id, token, refreshToken) {
    try {
        await sequelize.models.users_tokens.update(
            {token: token, refreshToken: refreshToken},
            {where: {id: id}},
        )
        return {token, refreshToken}
    } catch (err) {
        throw err
    }
}

async function newRefreshToken(refreshToken) {
    try {
        const token = await sequelize.models.users_tokens.findOne({
            where: {refreshToken: refreshToken},
        })
        const user = await sequelize.models.users.findOne({
            where: {id: token.id},
        })
        return user
    } catch (err) {
        throw err
    }
}

async function removeToken(token) {
    try {
        await sequelize.models.users_tokens.update(
            {token: null},
            {where: {token: token}},
        )
        return "Токен удален"
    } catch (err) {
        throw err
    }
}

module.exports = {
    addToken,
    newRefreshToken,
    removeToken,
}
