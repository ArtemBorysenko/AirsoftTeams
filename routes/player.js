const express = require('express');
const cntrl = require('../controllers/player');
const mail = require('../controllers/mailer');
const socketNtfc = require('../controllers/socketNotifications');
const router = express.Router();

router.get('/', cntrl.getAllPlayers);
router.get('/:id', cntrl.getPlayer);

router.use((req, res, next) => {
    if(req.role !== 'Admin' && req.role !== 'Manager') {
        res.send(req.role + "Доступ запрещен");
    }
    next();
});

router.get('/approve_team/:id', cntrl.approvingTeam, socketNtfc.ntfcApprove, mail.mailer);
router.post('/approve/:id', cntrl.approvingPlayer);
router.delete('/:id', cntrl.deleteFromTeam, socketNtfc.ntfcDeleted, mail.mailer);

router.use((req, res, next) => {
    if(req.role !== 'Admin') {
        res.send("Доступ запрещен");
    }
    next();
});

router.delete('/delete/:id', cntrl.deletePlayer);
router.post('/blocked/:id', cntrl.blockingPlayer);

module.exports = router;
