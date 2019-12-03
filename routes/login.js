const express = require('express');
const cntrl = require('../controllers/auth');
const router = express.Router();

router.post('/', cntrl.logIn);

module.exports = router;
