const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, favoriteController.getFavorites);
router.post('/:recipe_id', authMiddleware, favoriteController.addFavorite);
router.delete('/:recipe_id', authMiddleware, favoriteController.delFavorite);

module.exports = router;