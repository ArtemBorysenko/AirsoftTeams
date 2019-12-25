const sequelize = require("../connections/database")

async function addToken(id, token, refreshToken) {
    return sequelize.models.users_tokens
        .update({token: token, refreshToken: refreshToken}, {where: {id: id}})
        .then(() => {
            return {token, refreshToken}
        })
        .catch((err) => {
            throw err
        })
}

async function newRefreshToken(refreshToken) {
    return sequelize.models.users_tokens
        .findOne({
            where: {refreshToken: refreshToken},
        })
        .then((token) => {
            return sequelize.models.users
                .findOne({where: {id: token.id}})
                .then(async (user) => {
                    return user
                })
        })
        .catch((err) => {
            throw err
        })
}

async function removeToken(token) {
    return sequelize.models.users_tokens
        .update({token: null}, {where: {token: token}})
        .then(() => {
            return "Токен удален"
        })
        .catch((err) => {
            throw err
        })
}

module.exports = {
    addToken,
    newRefreshToken,
    removeToken,
}
