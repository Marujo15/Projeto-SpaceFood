const recipeRepository = require('../repository/recipeRepository');
const jwt = require('jsonwebtoken');
const config = require('../config');

const createRecipeService = async (name, ingredient, step, category, image, login) => {
    try {
        login = jwt.verify(login, config.SECRET_KEY);
        login = login.user;
        //await recipeRepository.createRecipeQuery(name, ingredient, step, category, image, login);

    } catch (error) {
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
};

module.exports = {
    createRecipeService,
}