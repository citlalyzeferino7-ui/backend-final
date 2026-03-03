const express = require('express');
const router = express.Router();
const controller = require('../controllers/rates.controller');

router.get('/', controller.getRates);

module.exports = router;