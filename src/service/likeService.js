const likeRepository = require('../repository/likeRepository');

const getLikesRecipeService = async (recipe_id) => {
    try {
        const result = await likeRepository.getLikeRecipeQuery(recipe_id);

        if(result.length === 0) {
            const error = new Error("Ainda não há curtidas nessa postagem.");
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

const getLikesService = async (user_id) => {
    try {
        const result = await likeRepository.getLikes(user_id);

        if(result.length === 0) {
            const error = new Error("Ainda não há curtidas.");
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

const likeRecipeService = async(recipe_id, user_id) => {
    try {
        await likeRepository.likeRecipeQuery(recipe_id, user_id);
        
    } catch (error) {
        if (error.code === '23505') {
            error.message = "Essa receita já foi curtida por você.";
            error.status = 409;
        }
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
}

const removeLikeRecipeService = async (recipe_id, user_id) => {
    try {
        await likeRepository.removeLikeRecipeQuery(recipe_id, user_id);
        
    } catch (error) {
        if (error.code === '02000') {
            error.message = "Curtida não encontrada na receita.";
            error.status = 404;
        }
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
}

module.exports = {
    getLikesRecipeService,
    likeRecipeService,
    removeLikeRecipeService,
    getLikesService,
}