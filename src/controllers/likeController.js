const likeService = require('../service/likeService');
const jwt = require('jsonwebtoken');
const config = require('../config');

const getLikesRecipe = async(req, res) => {
    try {
        const recipe_id = req.params.recipe_id;
        
        const result = await likeService.getLikesRecipeService(recipe_id);

        if(result.length === 0) {
            return res.status(200).json({ data: "Sem curtidas nessa receita.", status: 200 });
        }
      
        res.status(200).json({ data: result, status: 200 });
      
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

const getLikes = async(req, res) => {
    try {
        let user_id = req.cookies.session_id;
        user_id = jwt.verify(user_id, config.SECRET_KEY);
        user_id = user_id.user.id;

        const result = await likeService.getLikesService(user_id);
      
        res.status(200).json({ data: result, status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

const likeRecipe = async (req, res) => {
    try {
        const recipeId = req.params.recipe_id;
        let user_id = req.cookies.session_id;
        user_id = jwt.verify(user_id, config.SECRET_KEY);
        user_id = user_id.user.id;

        await likeService.likeRecipeService(recipeId, user_id);
        res.status(200).json({ message: "Receita curtida com sucesso.", status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

const removeLikeRecipe = async (req, res) => {
    try {
        const recipe_id = req.params.recipe_id;
        let user_id = req.cookies.session_id;
        user_id = jwt.verify(user_id, config.SECRET_KEY);
        user_id = user_id.user.id;
        await likeService.removeLikeRecipeService(recipe_id, user_id);
        res.status(200).json({ message: "Receita descurtida com sucesso.", status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

module.exports = {
    getLikesRecipe,
    likeRecipe,
    removeLikeRecipe,
    getLikes,
}