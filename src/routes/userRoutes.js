const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.get('/register', userController.checkUsername);
router.get('/register', userController.checkEmail);

router.post('/login', userController.login);

module.exports = router;
