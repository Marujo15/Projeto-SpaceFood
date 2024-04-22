const recipeRepository = require('../repository/recipeRepository');

const getAllRecipesService = async() => {
    try {
        const result = await recipeRepository.getAllRecipesQuery();
        if(!result ) {
            const error = new Error("Não foi possível pegar as receitas.");
            error.status = 500;
            throw error;
        }
        return result;
    } catch (error) {
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
}

const getRecipeByFollowingService = async (user_id) => {
    try {
        const result = await recipeRepository.getRecipeByFollowingQuery(user_id);
        if(!result ) {
            const error = new Error("Não foi possível pegar as receitas.");
            error.status = 500;
            throw error;
        }
        return result;
    } catch (error) {
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
}

const getRecipeDetailedService = async(recipe_id) => {
    try {
        const result = await recipeRepository.getRecipeDetailedQuery(recipe_id);

        if(!result ) {
            const error = new Error("Receita inexistente.");
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

const searchRecipeService = async(recipe_name, categories) => {
    try {
        const result = await recipeRepository.searchRecipeQuery(recipe_name, categories);

        if(result.length === 0 ) {
            const error = new Error("Sem resultados.");
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

const createRecipeService = async (name, ingredient, step, category, image, login) => {
    try {
        await recipeRepository.createRecipeQuery(name, ingredient, step, category, image, login);

    } catch (error) {
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
};

module.exports = {
    getAllRecipesService,
    getRecipeByFollowingService,
    getRecipeDetailedService,
    searchRecipeService,
    createRecipeService,
}