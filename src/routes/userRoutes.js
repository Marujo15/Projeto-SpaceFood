const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const userRoutesRegister = require('./userRoutesRegister');

router.get('/login', authMiddleware, userController.getLogin)
router.post('/login', userController.login);
router.delete('/login', authMiddleware, userController.clearCookies)
router.use('/register', userRoutesRegister);

module.exports = router;
