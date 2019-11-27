const sequelize = require('../../config/database');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const config = require('../../config');

async function getAllByUser_role(params) {
    return sequelize.models.users.findAll({ where: { user_role: params} });
};

async function getAllByTeam (params) {
    return sequelize.models.users.findAll({ where: { team: params} });
};

async function getById (paramsId) {
    return sequelize.models.users.findByPk(paramsId);
};

async function approving (paramsId, comment) {
    sequelize.models.users.update({ isActive: true },
        { where: { id: paramsId } });
    sequelize.models.comments.update({ actived: comment },
        { where: { id: paramsId } });
};

async function approvingTeam(paramsId, teamId) {
    sequelize.models.users.update({ team: teamId },
        { where: { id: paramsId } });
};

async function blocking (paramsId, comment) {
    sequelize.models.users.update({ isBlocked: true },
        { where: { id: paramsId } });
    sequelize.models.comments.update({ blocked: comment },
        { where: { id: paramsId } });
};

async function deleteUser (paramsId) {
    sequelize.models.users.destroy({ where: { id: paramsId}});
    sequelize.models.users_creds.destroy({ where: { id: paramsId}});
    sequelize.models.users_tokens.destroy({ where: { id: paramsId}});
    sequelize.models.comments.destroy({ where: { id: paramsId}});
};

async function deleteTeam (paramsId, comment) {
    sequelize.models.users.update({ team: null },
        { where: { id: paramsId } });
    sequelize.models.comments.update({ deleted: comment },
        { where: { id: paramsId } });
};

async function changeTeam (paramsId, teamId, comment) {
    sequelize.models.users.update({ team: `want ${teamId}` },
        { where: { id: paramsId } });
    sequelize.models.comments.update({ deleted: comment },
        { where: { id: paramsId } });
};

async function createToken (user,res) {
    const refreshToken = uuid();
    const token = jwt.sign(
        {
            username: user.username,
            id: user.id,
            role: user.user_role,
            isBlocked: user.isBlocked,
            isActive: user.isActive
        },
        config.secret,
        config.time
    );
    sequelize.models.users_tokens.update({ token: token, refreshToken: refreshToken },
        { where: { id: user.id } });
    return {token, refreshToken};
};

async function newRefreshToken (refreshToken, res) {
    sequelize.models.users_tokens.findOne({
        where: {refreshToken: refreshToken}
    }).then(token => {
        sequelize.models.users.findOne({ where: {id: token.id} }).then(user => {
            createToken(user, res);
        })
    }).catch((err) => {
        console.log('id not found');
        res
            .status(400)
            .json({err: err.message});
    });
};

async function removeToken (paramsId) {
    sequelize.models.users_tokens.update({ token: null},
        { where: { id: paramsId } });
};

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
    createToken,
    newRefreshToken,
    removeToken
};

