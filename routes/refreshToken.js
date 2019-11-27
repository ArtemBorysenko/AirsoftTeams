const express = require('express');
const cntrl = require('../controllers/refreshToken');
const router = new express.Router();

router.post('/', cntrl.refreshToken);

module.exports = router;
