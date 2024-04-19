const recipeService = require('../service/recipeService');
const validator = require('../utils/recipeValidator');
const jwt = require('jsonwebtoken');
const config = require('../config');

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await recipeService.getAllRecipesService();
        res.status(200).json({ data: recipes, status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

const getRecipeDetailed = async (req, res) => {
    try {
        const recipeid = req.params.recipe_id;
        const recipe = await recipeService.getRecipeDetailedService(recipeid);
        res.status(200).json({ data: recipe, status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

const searchRecipes = async (req, res) => {
    try {
        const recipeName = req.query.recipe_name.toLowerCase().trim();
        const categories = req.query.category.toLowerCase().split(',').map(category => category.trim()).filter(category => category !== '');
        const recipes = await recipeService.searchRecipeService(recipeName, categories);
        res.status(200).json({ data: recipes, status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

const createRecipe = async (req, res) => {
    try {
        if (!req.file) {
            const error = new Error("Nenhuma imagem foi enviada.");
            error.status = 400;
            throw error;
        }

        const { name, ingredient, step, category } = req.body;
        const image = req.file.filename;

        if (validator.isEmpty(name)) {
            const error = new Error("A receita deve ter um nome.");
            error.status = 400;
            throw error;
        }

        if (!validator.nameSize(name)) {
            const error = new Error("O nome não pode ser maior que 100 caracteres.");
            error.status = 422;
            throw error;
        }

        if (!Array.isArray(ingredient)) {
            const error = new Error("O corpo da requisição deve ser um array de objetos.");
            error.status = 400;
            throw error;
        }

        if (!Array.isArray(step)) {
            const error = new Error("O corpo da requisição deve ser um array de objetos.");
            error.status = 400;
            throw error;
        }

        if (!Array.isArray(category)) {
            const error = new Error("O corpo da requisição deve ser um array de objetos.");
            error.status = 400;
            throw error;
        }

        if(ingredient.length === 0) {
            const error = new Error("Deve haver pelo menos 1 ingrediente.");
            error.status = 400;
            throw error;
        }

        if(step.length === 0) {
            const error = new Error("Deve haver pelo menos 1 passo.");
            error.status = 400;
            throw error;
        }
        
        if(category.length === 0) {
            const error = new Error("Deve haver pelo menos 1 categoria.");
            error.status = 400;
            throw error;
        }

        ingredient.forEach(item => {
            if (validator.isEmpty(item)) {
                const error = new Error("O ingrediente deve ter um nome.");
                error.status = 400;
                throw error;
            }

            if (!validator.ingredientSize(item)) {
                const error = new Error("O nome do ingrediente não pode ser maior que 100 caracteres.");
                error.status = 400;
                throw error;
            }
        });

        category.forEach(item => {
            if (validator.isEmpty(item)) {
                const error = new Error("A categoria deve ter um nome.");
                error.status = 400;
                throw error;
            }

            if (!validator.ingredientSize(item)) {
                const error = new Error("A categoria não pode ser maior que 100 caracteres.");
                error.status = 400;
                throw error;
            }
        });

        step.forEach(item => {
            if (validator.isEmpty(item)) {
                const error = new Error("O passo deve ter uma descrição.");
                error.status = 400;
                throw error;
            }

            if (!validator.ingredientSize(item)) {
                const error = new Error("O passo não pode ser maior que 200 caracteres.");
                error.status = 400;
                throw error;
            }
        });

        let login = req.cookies.session_id;
        login = jwt.verify(login, config.SECRET_KEY);
        login = login.user.id;

        await recipeService.createRecipeService(name, ingredient, step, category, image, login);

        res.status(201).json({ message: 'Receita criada com sucesso', status: 201 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
};

module.exports = {
    getAllRecipes,
    getRecipeDetailed,
    searchRecipes,
    createRecipe,
}