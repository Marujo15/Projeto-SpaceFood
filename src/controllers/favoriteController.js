const favoriteService = require('../service/favoriteService');
const jwt = require('jsonwebtoken');
const config = require('../config');

const getFavorites = async(req, res) => {
    try {
        let user_id = req.cookies.session_id;
        user_id = jwt.verify(user_id, config.SECRET_KEY);
        user_id = user_id.user.id;
        
        const result = await favoriteService.getFavoritesService(user_id);

        if(result.length === 0) {
            return res.status(200).json({ data: "Nenhuma receita favoritada.", status: 200 });
        }

        res.status(200).json({ data: result, status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

const addFavorite = async (req, res) => {
    try {
        const recipeId = req.params.recipe_id;
        let user_id = req.cookies.session_id;
        user_id = jwt.verify(user_id, config.SECRET_KEY);
        user_id = user_id.user.id;

        await favoriteService.addFavoriteService(recipeId, user_id);
        res.status(200).json({ message: "Receita favoritada com sucesso.", status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

const delFavorite = async (req, res) => {
    try {
        const recipeId = req.params.recipe_id;
        let user_id = req.cookies.session_id;
        user_id = jwt.verify(user_id, config.SECRET_KEY);
        user_id = user_id.user.id;
        console.log("user_id:",user_id);
        console.log("recipe_id:",recipeId);
        await favoriteService.delFavoriteService(recipeId, user_id);
        res.status(200).json({ message: "Receita removida dos favoritos com sucesso.", status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}
module.exports = {
    getFavorites,
    addFavorite,
    delFavorite,
}