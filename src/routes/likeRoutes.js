const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const authMiddleware = require('../middlewares/authMiddleware');

// router.get('/:recipe_id', authMiddleware, likeController.getLikesRecipe);
router.get('/:user_id', authMiddleware, likeController.getLikes);
router.post('/:recipe_id', authMiddleware, likeController.likeRecipe);
router.delete('/:recipe_id', authMiddleware, likeController.removeLikeRecipe);

module.exports = router;