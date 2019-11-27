const express = require('express');
const cntrl = require('../controllers/team');
const mail = require('../controllers/mailer');
const socketNtfc = require('../controllers/socketNotifications');
const router = express.Router();


router.get('/:id', cntrl.getPlayersByTeam);
router.post('/out/:id', cntrl.outPlayerWithTeam, socketNtfc.ntfcSwitch, mail.mailer);

router.use((req, res, next) => {
    if(req.role === 'Admin' && req.role === 'Manager') {
        res.send("Доступ запрещен");
    }
    next();
});

router.get('/add/:id', cntrl.addPlayerInTeam, socketNtfc.ntfcSwitch, mail.mailer);
router.get('/switch/:id', cntrl.switchTeam, socketNtfc.ntfcSwitch, mail.mailer);

module.exports = router;
