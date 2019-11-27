const db = require('../models/database/db');

async function getPlayer(req, res) {
    db.getById(req.params.id)
        .then((user) => {
            if (user && user.user_role === 'Player') {
                res.json(user);
            } else {
                res
                    .status(400)
                    .json({err: 'Player not found'});
            }
        })
        .catch((err) => {
            res
                .status(400)
                .json({err: err.message});
        })
};

async function getAllPlayers (req, res) {
    db.getAllByUser_role("Player")
        .then((user) => {
        if (user) {
            res.json(user);
        } else {
            res
                .status(400)
                .json({err: 'Players not found'});
        }
    })
        .catch((err) => {
            res
                .status(400)
                .json({err: err.message});
        })
};

async function approvingPlayer (req, res, next) {
    db.getById(req.params.id)
        .then((user) => {
            if (user && user.user_role === 'Player') {
                db.approving(req.params.id, req.body.comment)
                res.json('Игрок подтвержден');
                next();
            } else {
                res
                    .status(400)
                    .json({err: 'Player not found'});
            }
        })
        .catch((err) => {
            res
                .status(400)
                .json({err: err.message});
        });
};

async function blockingPlayer(req, res) {
    db.getById(req.params.id)
        .then((user) => {
            if (user && user.user_role === 'Player') {
                db.blocking(req.params.id, req.body.comment)
                res.json('Игрок заблокирован');
            } else {
                res
                    .status(400)
                    .json({err: 'Player not found'});
            }
        })
        .catch((err) => {
            res
                .status(400)
                .json({err: err.message});
        });
};

async function deletePlayer (req, res) {
    db.deleteUser(req.params.id);
    res.send('пользователь удален')
};

async function deleteFromTeam (req, res, next) {
    db.getById(req.params.id)
        .then((user) => {
            if (user && user.user_role === 'Player') {
                db.deleteTeam(req.params.id, null);
                res.json('Игрок удален из команды');
                next();
            } else {
                res
                    .status(400)
                    .json({err: 'Player not found'});
            }
        })
        .catch((err) => {
            res
                .status(400)
                .json({err: err.message});
        })
}

async function approvingTeam (req, res, next) {
    db.getById(req.params.id)
        .then((user) => {
            if (user && user.user_role === 'Player') {
                if( user.team === 'want A')
                    db.approvingTeam(req.params.id, 'A');
                if( user.team === 'want B')
                    db.approvingTeam(req.params.id, 'B');
                 res.send('команда изменена');
                 next();
            } else {
                res
                    .status(400)
                    .json({err: 'Player not found'});
            }
        })
        .catch((err) => {
            res
                .status(400)
                .json({err: err.message});
        })
};

module.exports = {
    getPlayer,
    getAllPlayers,
    approvingPlayer,
    blockingPlayer,
    deletePlayer,
    deleteFromTeam,
    approvingTeam
};
