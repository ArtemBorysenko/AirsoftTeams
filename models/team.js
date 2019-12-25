const sequelize = require("../connections/database")

async function getAllPlayersByTeam(params) {
    return sequelize.models.teams_names
        .findOne({where: {name: params}})
        .then((user) => {
            return sequelize.models.users.findAll({
                where: {teamsNameId: user.id},
            })
        })
        .catch((err) => {
            throw err
        })
}

async function deleteTeam(paramsId, comment) {
    sequelize.models.users
        .update({teamsNameId: null}, {where: {id: paramsId}})
        .catch((err) => {
            throw err
        })
    sequelize.models.status_players.update(
        {teamsNameId: null, status: null},
        {where: {userId: paramsId}},
    )
    sequelize.models.comments
        .update({deleted: comment}, {where: {id: paramsId}})
        .catch((err) => {
            throw err
        })
}

async function approvingTeam(paramsId, status) {
    return sequelize.models.status_players
        .findOne({where: {userId: paramsId}})
        .then((user) => {
            if (!user || user.status !== "Pending")
                throw new Error("Player not pending")
            sequelize.models.status_players.update(
                {status: status},
                {where: {userId: paramsId}},
            )
        })
        .catch((err) => {
            throw err
        })
}

async function applyAdditionTeam(paramsId, teamName) {
    return sequelize.models.teams_names
        .findOne({where: {name: teamName}})
        .then((user) => {
            if (!user) throw new Error("Team with that name not found")
            sequelize.models.status_players.update(
                {teamsNameId: user.id, status: "Pending"},
                {where: {userId: paramsId}},
            )
            sequelize.models.users.update(
                {teamsNameId: user.id},
                {where: {id: paramsId}},
            )
        })
        .catch((err) => {
            throw err
        })
}

module.exports = {
    getAllPlayersByTeam,
    approvingTeam,
    deleteTeam,
    applyAdditionTeam,
}
