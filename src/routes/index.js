const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');

router.use('/user', userRoutes);
router.use('/recipe', recipeRoutes);

module.exports = router;
