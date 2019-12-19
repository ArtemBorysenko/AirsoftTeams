const sequelize = require("../connections/database")

async function getAllByUser_role(params) {
    return sequelize.models.users
        .findAll({where: {user_role: params}})
        .catch((err) => {
            throw err
        })
}

async function getUserById(paramsId) {
    return sequelize.models.users.findByPk(paramsId).catch((err) => {
        throw err
    })
}

async function approvingUser(paramsId, comment) {
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

async function blockingUser(paramsId, comment) {
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
        sequelize.models.status_players.destroy({where: {id: paramsId}})
    } catch (err) {
        throw err
    }
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
    getUserById,
    approvingUser,
    blockingUser,
    deleteUser,
    deleteUserByName,
}
