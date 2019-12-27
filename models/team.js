const sequelize = require("../connections/database")

async function getAllPlayersByTeam(params) {
    try {
        const user = await sequelize.models.teams_names.findOne({
            where: {name: params},
        })
        return await sequelize.models.users.findAll({
            where: {teamsNameId: user.id},
        })
    } catch (err) {
        throw err
    }
}

async function deleteTeam(paramsId, comment) {
    try {
        return Promise.all([
            sequelize.models.users.update(
                {teamsNameId: null},
                {where: {id: paramsId}},
            ),
            sequelize.models.status_players.update(
                {teamsNameId: null, status: null},
                {where: {userId: paramsId}},
            ),
            sequelize.models.comments.update(
                {deleted: comment},
                {where: {id: paramsId}},
            ),
        ])
    } catch (err) {
        throw err
    }
}

async function approvingTeam(paramsId, status) {
    try {
        const user = await sequelize.models.status_players.findOne({
            where: {userId: paramsId},
        })
        if (!user || user.status !== "Pending")
            throw new Error("Player not pending")
        await sequelize.models.status_players.update(
            {status: status},
            {where: {userId: paramsId}},
        )
        return user
    } catch (err) {
        throw err
    }
}

async function applyAdditionTeam(paramsId, teamName) {
    try {
        const user = await sequelize.models.teams_names.findOne({
            where: {name: teamName},
        })
        if (!user) throw new Error("Team with that name not found")
        await sequelize.models.status_players.update(
            {teamsNameId: user.id, status: "Pending"},
            {where: {userId: paramsId}},
        )
        await sequelize.models.users.update(
            {teamsNameId: user.id},
            {where: {id: paramsId}},
        )
        return user
    } catch (err) {
        throw err
    }
}

module.exports = {
    getAllPlayersByTeam,
    approvingTeam,
    deleteTeam,
    applyAdditionTeam,
}
