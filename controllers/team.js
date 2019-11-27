const db = require('../models/database/db');

async function getPlayersByTeam(req, res) {
    db.getAllByTeam(req.params.id)
        .then((user) => {
        if (user) {
            res.json(user);
        } else {
            res
                .status(400)
                .json({err: 'Team not found'});
        }
    })
        .catch((err) => {
            res
                .status(400)
                .json({err: err.message});
        })
};

async function addPlayerInTeam(req, res, next) {
    db.getById(req.id)
        .then((user) => {
            if (user && user.user_role === 'Player' && user.team !== 'A' && user.team !== 'B') {
                db.changeTeam(req.id, req.params.id);
                res.json('Запрос отправлен');
                next();
            } else {
                res
                    .status(400)
                    .json({err: req.id});
            }
        })
        .catch((err) => {
            res
                .status(400)
                .json({err: err.message});
        })
};

async function outPlayerWithTeam (req, res, next) {
    db.getById(req.params.id)
        .then((user) => {
            if (user && user.user_role === 'Player') {
                db.deleteTeam(req.params.id, req.body.comment);
                res.send('Игрок покинул команду');
                next();
            } else {
                res
                    .status(400)
                    .json({err: 'Team not found'});
            }
        })
        .catch((err) => {
            res
                .status(400)
                .json({err: err.message});
        })
};

async function switchTeam(req, res, next) {
    db.getById(req.params.id)
        .then((user) => {
            if (user && user.user_role === 'Player') {
                if(user.team === 'A')
                db.changeTeam(req.params.id, 'B');
                if(user.team === 'B')
                    db.changeTeam(req.params.id, 'A');
                if(user.team !== 'B' && user.team !== 'A')
                    res.json(`${user.username} не входит в команду`);
                res.json('Запрос отправлен');
                next();
            } else {
                res
                    .status(400)
                    .json({err: 'Team not found'});
            }
        })
        .catch((err) => {
            res
                .status(400)
                .json({err: err.message});
        })
};

module.exports = {
    getPlayersByTeam,
    addPlayerInTeam,
    outPlayerWithTeam,
    switchTeam
};