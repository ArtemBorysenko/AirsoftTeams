const sequelize = require('../../connections/database');
const bcrypt = require('bcryptjs');
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

async function createToken (user, res) {
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
        sequelize.models.users.findOne({ where: {id: token.id} }).then(async user => {
            const token = await createToken(user, res);
            res.json(token);
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

async function registration (req, res, next) {

    sequelize.models.users.findOne({ where: {username: req.body.username} }).then(user => {
        if (user) {
            res
                .status(400)
                .json('Пользователь с таким логином уже существует');
        }
        else
            sequelize.models.users.create(
                {
                    username: req.body.username,
                    user_role: req.body.user_role,
                    team: req.body.team,
                    isActive: req.body.isActive || false, // isActive = false
                    isBlocked: false,
                    usercred: {
                        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
                    },
                    tokens: {
                        token: null,
                        refreshToken: null
                    },
                    comment: {
                        blocked: null,
                        deleted: null,
                        actived: null
                    }
                },
                {
                    include: [{all: true }]
                }
            );
        if(req.body.user_role === 'Manager' && !user) next();
        else res.status(200).json('Пользователь зарегистрирван');
    });

}

async function login (req, res, next) {

    sequelize.models.users.findOne({ where: {username: req.body.username} }).then(user => {
        sequelize.models.users_creds.findOne({ where: {id: user.id} }).then(async users_creds => {
            if(bcrypt.compareSync(req.body.password, users_creds.password))
            {
                const token = await createToken(user, res);
                res.json(token);
            }
            else {
                console.log('Неверный пароль');
                const err = new Error();
                err.status = 403;
                throw err;
            }
        });
    }).catch((err) => {
        console.log('Неверный логин');
        res
            .status(400)
            .json({err: err.message});
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
    createToken,
    newRefreshToken,
    removeToken,
    registration,
    login
};

