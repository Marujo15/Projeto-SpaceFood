const commentaryRepository = require('../repository/commentaryRepository');

const getCommentaryService = async (recipe_id) => {
    try {
        const result = await commentaryRepository.getCommentaryQuery(recipe_id);

        return result;
    } catch (error) {
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
}

const addCommentaryService = async(recipeId, user_id, commentaryText) => {
    try {
        await commentaryRepository.addCommentaryQuery(recipeId, user_id, commentaryText);
        
    } catch (error) {
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
}

module.exports = {
    getCommentaryService,
    addCommentaryService,
}