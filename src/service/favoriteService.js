const favoriteRepository = require('../repository/favoriteRepository');

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

module.exports = {
    addFavoriteService,
}