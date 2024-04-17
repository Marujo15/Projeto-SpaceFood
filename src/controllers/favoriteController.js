const favoriteService = require('../service/favoriteService');
const jwt = require('jsonwebtoken');
const config = require('../config');

const getFavorites = async(req, res) => {
    try {
        let user_id = req.cookies.session_id;
        user_id = jwt.verify(user_id, config.SECRET_KEY);
        user_id = user_id.user.id;
        
        const result = await favoriteService.getFavoritesService(user_id);
        res.status(200).json({ data: result, status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

const addFavorite = async (req, res) => {
    try {
        const recipeId = req.body.recipe_id;
        let user_id = req.cookies.session_id;
        user_id = jwt.verify(user_id, config.SECRET_KEY);
        user_id = user_id.user.id;

        await favoriteService.addFavoriteService(recipeId, user_id);
        res.status(200).json({ message: "Receita favoritada com sucesso.", status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

module.exports = {
    getFavorites,
    addFavorite,
}