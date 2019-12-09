const sequelize = require("../../connections/database")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const uuid = require("uuid/v4")
const config = require("../../config")

async function getAllByUser_role(params) {
    return sequelize.models.users.findAll({where: {user_role: params}})
}

async function getAllByTeam(params) {
    return sequelize.models.users.findAll({where: {team: params}})
}

async function getById(paramsId) {
    return sequelize.models.users.findByPk(paramsId)
}

async function approving(paramsId, comment) {
    sequelize.models.users.update({isActive: true}, {where: {id: paramsId}})
    sequelize.models.comments.update(
        {actived: comment},
        {where: {id: paramsId}},
    )
}

async function approvingTeam(paramsId, teamId) {
    sequelize.models.users.update({team: teamId}, {where: {id: paramsId}})
}

async function blocking(paramsId, comment) {
    sequelize.models.users.update({isBlocked: true}, {where: {id: paramsId}})
    sequelize.models.comments.update(
        {blocked: comment},
        {where: {id: paramsId}},
    )
}

async function deleteUser(paramsId) {
    sequelize.models.users.destroy({where: {id: paramsId}})
    sequelize.models.users_creds.destroy({where: {id: paramsId}})
    sequelize.models.users_tokens.destroy({where: {id: paramsId}})
    sequelize.models.comments.destroy({where: {id: paramsId}})
}

async function deleteTeam(paramsId, comment) {
    sequelize.models.users.update({team: null}, {where: {id: paramsId}})
    sequelize.models.comments.update(
        {deleted: comment},
        {where: {id: paramsId}},
    )
}

async function changeTeam(paramsId, teamId, comment) {
    sequelize.models.users.update(
        {team: `want ${teamId}`},
        {where: {id: paramsId}},
    )
    sequelize.models.comments.update(
        {deleted: comment},
        {where: {id: paramsId}},
    )
}

async function addToken(id, token, refreshToken) {
    sequelize.models.users_tokens.update(
        {token: token, refreshToken: refreshToken},
        {where: {id: id}},
    )
    return {token, refreshToken}
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
            return new Error("id not found" + err)
        })
}

async function removeToken(token) {
    return sequelize.models.users_tokens
        .update({token: null}, {where: {token: token}})
        .then(() => {
            return "Токен удален"
        })
        .catch((err) => {
            return new Error("Ошибка при удаление токена" + err)
        })
}

async function registration(newUser) {
    return await sequelize.models.users
        .findOne({where: {username: newUser.username}})
        .then((user) => {
            if (user) {
                return new Error("Пользователь с таким логином уже существует")
            } else
                return sequelize.models.users
                    .create(newUser, {
                        include: [{all: true}],
                    })
                    .then(() => {
                        return "Пользователь зарегистрировался"
                    })
        })
        .catch((err) => {
            return new Error("Ошибка при регистрации" + err)
        })
}

async function login(username, password) {
    return sequelize.models.users
        .findOne({where: {username: username}})
        .then((user) => {
            return sequelize.models.users_creds
                .findOne({where: {id: user.id}})
                .then(async (users_creds) => {
                    if (bcrypt.compareSync(password, users_creds.password)) {
                        return user
                    } else {
                        return new Error("Неверный логин или пароль")
                    }
                })
        })
        .catch((err) => {
            return new Error("Ошибка БД " + err)
        })
}

module.exports = {
    getAllByUser_role,
    getAllByTeam,
    getById,
    approving,
    approvingTeam,
    blocking,
    deleteUser,
    deleteTeam,
    changeTeam,
    addToken,
    newRefreshToken,
    removeToken,
    registration,
    login,
}
