const express = require('express');
const cntrl = require('../controllers/auth');
const router = new express.Router();

router.post('/', cntrl.refreshToken);

module.exports = router;
