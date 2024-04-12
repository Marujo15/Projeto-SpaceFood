const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
//const loginRoutes = require('./userRoutes');

router.use('/user', userRoutes);
// router.use('/login', loginRoutes);

module.exports = router;
