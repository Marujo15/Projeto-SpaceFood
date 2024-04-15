const { connectToDatabase } = require("../database/postgresql");

const getAllRecipesQuery = async() => {
    const client = await connectToDatabase();
    try {
        const result = await client.query('SELECT recipe.id AS recipe_id, recipe.name AS recipe_name, recipe.image AS recipe_image, users.id AS user_id, users.name AS name_user, users.image AS user_image FROM recipe INNER JOIN users ON recipe.user_id = users.id');
        return result.rows;
    } catch (error) {
        throw error;
    }
}

const getRecipeDetailedQuery = async(recipe_id) => {
    const client = await connectToDatabase();
    try {
        const result = await client.query('SELECT recipe.id AS recipe_id, recipe.name AS recipe_name, recipe.image AS recipe_image, ingredient.ingredients AS ingredients, preparation_method.steps AS preparation_method FROM recipe INNER JOIN (SELECT recipe_id, ARRAY_AGG(name) AS ingredients FROM ingredient GROUP BY recipe_id) AS ingredient ON recipe.id = ingredient.recipe_id INNER JOIN (SELECT recipe_id, ARRAY_AGG(step) AS steps FROM preparation_method GROUP BY recipe_id) AS preparation_method ON recipe.id = preparation_method.recipe_id WHERE recipe.id = $1', [recipe_id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

const createRecipeQuery = async (name, ingredients, steps, category, image, login) => {
    const client = await connectToDatabase();
    try {
        await client.query('BEGIN');
        const recipeInsertResult = await client.query('INSERT INTO recipe (name, image, user_id) VALUES ($1, $2, $3) RETURNING id', [name, image, login]);
        
        const recipeId = recipeInsertResult.rows[0].id;

        if (!recipeId) {
            throw new Error("Falha ao obter o ID da receita.");
        }

        for (const ingredient of ingredients) {
            const result = await client.query('INSERT INTO ingredient (name, recipe_id) VALUES ($1, $2)', [ingredient, recipeId]);
            if (result.rowCount !== 1) {
                const error = new Error("Erro ao inserir ingredientes.");
                error.status = 500;
                throw error;
            }
        }

        for (const step of steps) {
            const result = await client.query('INSERT INTO preparation_method (step, recipe_id) VALUES ($1, $2)', [step, recipeId]);
            if (result.rowCount !== 1) {
                const error = new Error("Erro ao inserir passos.");
                error.status = 500;
                throw error;
            }
        }

        for (const cat of category) {
            const result = await client.query('INSERT INTO category (name, recipe_id) VALUES ($1, $2)', [cat, recipeId]);
            if (result.rowCount !== 1) {
                const error = new Error("Erro ao inserir categorias.");
                error.status = 500;
                throw error;
            }
        }

        await client.query('COMMIT');

        console.log("Dados inseridos com sucesso!");
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    getAllRecipesQuery,
    getRecipeDetailedQuery,
    createRecipeQuery,
}
