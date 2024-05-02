const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const favoriteRoutes = require('./favoriteRoutes');
const commentaryRoutes = require('./commentaryRoutes');
const likeRoutes = require('./likeRoutes');
const followRoutes = require('./followRoutes');

router.use(morgan(function (tokens, req, res) {
    return [
        '[', new Date().toLocaleString(), ']',
        '\nEndereço IP:', tokens['remote-addr'](req, res),
        '\nMétodo:', tokens.method(req, res),
        '\nURL:', tokens.url(req, res),
        '\nCódigo:', tokens.status(req, res),
        '\nTamanho:', tokens.res(req, res, 'content-length'), '-',
        '\nDuração:', tokens['response-time'](req, res), 'ms',
        '\nCorpo:', JSON.stringify(req.body),
    ].join(' ');
}, {
    stream: process.stdout,
    skip: (req, res) => res.statusCode < 400
}));

router.use('/user', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/favorite', favoriteRoutes);
router.use('/commentary', commentaryRoutes);
router.use('/like', likeRoutes);
router.use('/follow', followRoutes);

module.exports = router;