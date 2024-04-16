const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const favoriteRoutes = require('./favoriteRoutes');

router.use('/user', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/favorite', favoriteRoutes);

module.exports = router;