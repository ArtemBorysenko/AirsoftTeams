const express = require('express');
const manager = require('../controllers/manager');
const player = require('../controllers/player');
const router = express.Router();

router.use((req, res, next) => {
    if(req.role !== 'Admin') {
        res.status(401).json(req.role + " Доступ запрещен");
    }
    next();
});

router.get('/player/', player.getAllPlayers);
router.get('/player/:id', player.getPlayer);
router.get('/manager/', manager.getAllManagers);
router.get('/manager/:id', manager.getManager);
router.post('/manager/approve/:id', manager.approvingManager);
router.post('/manager/blocked/:id', manager.blockingManager);
router.post('/player/approve/:id', player.approvingPlayer);
router.post('/player/blocked/:id', player.blockingPlayer);
router.delete('/delete/:id', player.deleteUser);

module.exports = router;
