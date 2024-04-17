const express = require('express');
const router = express.Router();
const commentaryController = require('../controllers/commentaryController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:recipe_id', authMiddleware, commentaryController.getCommentaries);
router.post('/:recipe_id', authMiddleware, commentaryController.addCommentary);

module.exports = router;