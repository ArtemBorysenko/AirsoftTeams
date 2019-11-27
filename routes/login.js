const express = require('express');
const dbApi = require('../controllers/login');
const router = express.Router();

router.post('/', dbApi.logIn);

module.exports = router;
