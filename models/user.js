const sequelize = require("../connections/database")

async function getAllByUser_role(params) {
    try {
        return await sequelize.models.users.findAll({
            where: {user_role: params},
        })
    } catch (err) {
        throw err
    }
}

async function getUserById(paramsId) {
    try {
        return await sequelize.models.users.findByPk(paramsId)
    } catch (err) {
        throw err
    }
}

async function approvingUser(paramsId, comment) {
    try {
        return Promise.all([
            sequelize.models.users.update(
                {isActive: true},
                {where: {id: paramsId}},
            ),
            sequelize.models.comments.update(
                {actived: comment},
                {where: {id: paramsId}},
            ),
        ])
    } catch (err) {
        throw err
    }
}

async function blockingUser(paramsId, comment) {
    try {
        return Promise.all([
            sequelize.models.users.update(
                {isBlocked: true},
                {where: {id: paramsId}},
            ),
            sequelize.models.comments.update(
                {blocked: comment},
                {where: {id: paramsId}},
            ),
        ])
    } catch (err) {
        throw err
    }
}

async function deleteUser(params) {
    try {
        const user = await sequelize.models.users.findOne({
            where: {username: params},
        })
        if (!user)
            return await sequelize.models.users.destroy({where: {id: params}})
        return await sequelize.models.users.destroy({where: {id: user.id}})
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
}
