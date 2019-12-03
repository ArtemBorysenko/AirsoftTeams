const express = require('express');
const team = require('../controllers/team');
const player = require('../controllers/player');
const mail = require('../controllers/mailer');
const socketNtfc = require('../controllers/socketNotifications');
const router = express.Router();

router.use((req, res, next) => {
    if(req.role !== 'Player') {
        res.status(401).json(req.role + " Доступ запрещен");
    }
    next();
});

router.get('/player/', player.getAllPlayers);
router.get('/player/:id', player.getPlayer);
router.get('/team/:id', team.getPlayersByTeam);
router.get('/team/add/:id', team.addPlayerInTeam, socketNtfc.ntfcSwitch, mail.mailer);
router.get('/team/switch/:id', team.switchTeam, socketNtfc.ntfcSwitch, mail.mailer);
router.post('/team/out/:id', team.outPlayerWithTeam, socketNtfc.ntfcSwitch, mail.mailer);

module.exports = router;
