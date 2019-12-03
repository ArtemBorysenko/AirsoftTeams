const express = require('express');
const cntrl = require('../controllers/auth');
const router = express.Router();

router.get('/', cntrl.logOut);

module.exports = router;
