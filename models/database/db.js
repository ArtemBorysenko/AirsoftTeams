const sequelize = require("../../connections/database")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const uuid = require("uuid/v4")
const config = require("../../config")

async function getAllByUser_role(params) {
    return sequelize.models.users
        .findAll({where: {user_role: params}})
        .catch((err) => {
            throw err
        })
}

async function getAllByTeam(params) {
    return sequelize.models.users
        .findAll({where: {team: params}})
        .catch((err) => {
            throw err
        })
}

async function getById(paramsId) {
    return sequelize.models.users.findByPk(paramsId).catch((err) => {
        throw err
    })
}

async function approving(paramsId, comment) {
    sequelize.models.users
        .update({isActive: true}, {where: {id: paramsId}})
        .catch((err) => {
            throw err
        })
    sequelize.models.comments
        .update({actived: comment}, {where: {id: paramsId}})
        .catch((err) => {
            throw err
        })
}

async function approvingTeam(paramsId, teamId) {
    sequelize.models.users
        .update({team: teamId}, {where: {id: paramsId}})
        .catch((err) => {
            throw err
        })
}

async function blocking(paramsId, comment) {
    sequelize.models.users
        .update({isBlocked: true}, {where: {id: paramsId}})
        .catch((err) => {
            throw err
        })
    sequelize.models.comments
        .update({blocked: comment}, {where: {id: paramsId}})
        .catch((err) => {
            throw err
        })
}

async function deleteUser(paramsId) {
    try {
        sequelize.models.users.destroy({where: {id: paramsId}})
        sequelize.models.users_creds.destroy({where: {id: paramsId}})
        sequelize.models.users_tokens.destroy({where: {id: paramsId}})
        sequelize.models.comments.destroy({where: {id: paramsId}})
    } catch (err) {
        throw err
    }
}

async function deleteTeam(paramsId, comment) {
    sequelize.models.users
        .update({team: null}, {where: {id: paramsId}})
        .catch((err) => {
            throw err
        })
    sequelize.models.comments
        .update({deleted: comment}, {where: {id: paramsId}})
        .catch((err) => {
            throw err
        })
}

async function changeTeam(paramsId, teamId, comment) {
    sequelize.models.users
        .update({team: `want ${teamId}`}, {where: {id: paramsId}})
        .catch((err) => {
            throw err
        })
    sequelize.models.comments
        .update({deleted: comment}, {where: {id: paramsId}})
        .catch((err) => {
            throw err
        })
}

async function addToken(id, token, refreshToken) {
    sequelize.models.users_tokens
        .update({token: token, refreshToken: refreshToken}, {where: {id: id}})
        .catch((err) => {
            throw err
        })
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

async function registration(newUser) {
    return await sequelize.models.users
        .findOne({where: {username: newUser.username}})
        .then((user) => {
            if (user) {
                throw new Error("User with this email already exist.")
            }
            return sequelize.models.users
                .create(newUser, {
                    include: [{all: true}],
                })
                .then(() => {
                    return "Пользователь зарегистрировался"
                })
        })
        .catch((err) => {
            throw err
        })
}

async function login(username, password) {
    return sequelize.models.users
        .findOne({where: {username: username}})
        .then((user) => {
            return sequelize.models.users_creds
                .findOne({where: {id: user.id}})
                .then(async (users_creds) => {
                    if (!bcrypt.compareSync(password, users_creds.password)) {
                        throw new Error("wrong login or password")
                    }
                    return user
                })
        })
        .catch((err) => {
            throw err
        })
}

async function deleteUserByName(params) {
    try {
        sequelize.models.users
            .findAll({where: {username: params}})
            .then((user) => {
                sequelize.models.users.destroy({where: {id: user[0].id}})
                sequelize.models.users_creds.destroy({where: {id: user[0].id}})
                sequelize.models.users_tokens.destroy({where: {id: user[0].id}})
                sequelize.models.comments.destroy({where: {id: user[0].id}})
            })
    } catch (err) {
        throw err
    }
}

module.exports = {
    getAllByUser_role,
    getAllByTeam,
    getById,
    approving,
    approvingTeam,
    blocking,
    deleteUser,
    deleteUserByName,
    deleteTeam,
    changeTeam,
    addToken,
    newRefreshToken,
    removeToken,
    registration,
    login,
}
