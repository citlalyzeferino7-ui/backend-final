const express = require('express');
const router = express.Router();

const { getRates } = require('../external.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');

router.get('/rates', authMiddleware, getRates);

module.exports = router;