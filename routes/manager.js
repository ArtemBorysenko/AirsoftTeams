const express = require('express');
const team = require('../controllers/team');
const player = require('../controllers/player');
const mail = require('../controllers/mailer');
const socketNtfc = require('../controllers/socketNotifications');
const router = express.Router();

router.use((req, res, next) => {
    if(req.role !== 'Manager') {
        res.status(401).json(req.role + " Доступ запрещен");
    }
    next();
});

router.get('/player/approve_team/:id', player.approvingTeam, socketNtfc.ntfcApprove, mail.mailer);
router.get('/player/', player.getAllPlayers);
router.get('/player/:id', player.getPlayer);
router.get('/player/team/:id', team.getPlayersByTeam);
router.delete('/player/team/:id', player.deleteFromTeam, socketNtfc.ntfcDeleted, mail.mailer);

module.exports = router;
