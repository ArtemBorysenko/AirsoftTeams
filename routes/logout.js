const express = require('express');
const cntrl = require('../controllers/logout');
const router = express.Router();

router.get('/', cntrl.logOut);

module.exports = router;
