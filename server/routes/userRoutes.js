const express = require('express');

const userControllers = require('../controllers/userControllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.post('/signup', fileUpload.single('image'), userControllers.signup);
router.post('/login', userControllers.login);

module.exports = router;

