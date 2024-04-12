const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/login', authMiddleware, userController.getLogin)
router.delete('/login', authMiddleware, userController.clearCookies)
router.post('/register', userController.registerUser);
router.get('/register', userController.checkUsername);
router.get('/register', userController.checkEmail);

router.post('/login', userController.login);

module.exports = router;
