const favoriteRepository = require('../repository/favoriteRepository');

const getFavoritesService = async (user_id) => {
    try {
        const result = await favoriteRepository.getFavoritesQuery(user_id);

        if(result.length === 0) {
            const error = new Error("Não existe receitas favoritadas.");
            error.status = 404;
            throw error;
        }

        return result;
    } catch (error) {
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
}

const addFavoriteService = async(recipe_id, user_id) => {
    try {
        await favoriteRepository.addFavoriteQuery(recipe_id, user_id);
        
    } catch (error) {
        if (error.code === '23505') {
            error.message = "Essa receita já está favoritada.";
            error.status = 409;
        }
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
}

const delFavoriteService = async(recipe_id, user_id) => {
    try {
        await favoriteRepository.delFavoriteQuery(recipe_id, user_id);
        
    } catch (error) {
        if (error.code === '23505') {
            error.message = "Essa receita não está cadastrada.";
            error.status = 409;
        }
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
}

module.exports = {
    getFavoritesService,
    addFavoriteService,
    delFavoriteService,
}