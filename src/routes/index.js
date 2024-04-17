const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const favoriteRoutes = require('./favoriteRoutes');
const commentaryRoutes = require('./commentaryRoutes');

router.use('/user', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/favorite', favoriteRoutes);
router.use('/commentary', commentaryRoutes);

module.exports = router;