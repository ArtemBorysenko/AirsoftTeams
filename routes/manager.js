const express = require('express');
const cntrl = require('../controllers/manager');
const mail = require('../controllers/mailer');
const socketNtfc = require('../controllers/socketNotifications');
const router = express.Router();

router.use((req, res, next) => {
    if(req.role === 'Player' && req.role === 'Manager') {
        res.send("Доступ запрещен");
    }
    next();
});

router.get('/', cntrl.getAllManagers);
router.get('/:id', cntrl.getManager);
router.post('/approve/:id', cntrl.approvingManager);
router.post('/blocked/:id', cntrl.blockingManager);
router.delete('/:id', cntrl.deleteManager);

module.exports = router;
