const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, favoriteController.addFavorite);

module.exports = router;