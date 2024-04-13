const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/username/:username', userController.checkUsername);
router.get('/email/:email', userController.checkEmail);
router.post('/', userController.registerUser);

module.exports = router;