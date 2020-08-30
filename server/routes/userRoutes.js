const express = require('express');

const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);

module.exports = router;

