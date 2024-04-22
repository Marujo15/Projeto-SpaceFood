const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/followers/:user_id', authMiddleware, followController.getFollowers);
router.get('/followed/:user_id', authMiddleware, followController.getFollowed);
router.post('/:user_id', authMiddleware, followController.follow);
router.delete('/:user_id', authMiddleware, followController.unfollow);

module.exports = router;