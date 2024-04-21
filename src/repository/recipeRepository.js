const { connectToDatabase } = require("../database/postgresql");

const getAllRecipesQuery = async () => {
    const client = await connectToDatabase();
    try {
        const result = await client.query('SELECT recipe.id AS recipe_id, recipe.name AS recipe_name, recipe.image AS recipe_image, recipe.created_at AS recipe_date, users.id AS user_id, users.name AS name_user, users.image AS user_image FROM recipe INNER JOIN users ON recipe.user_id = users.id');
        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const getRecipeDetailedQuery = async (recipe_id) => {
    const client = await connectToDatabase();
    try {
        const result = await client.query('SELECT  (SELECT ARRAY_AGG(name) FROM ingredient WHERE recipe_id = $1) AS ingredient_names, (SELECT ARRAY_AGG(step) FROM preparation_method WHERE recipe_id = $1) AS preparation_steps, (SELECT ARRAY_AGG(name) FROM category WHERE recipe_id = $1) AS category_name;', [recipe_id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const searchRecipeQuery = async (recipe_name, categories) => {
    const client = await connectToDatabase();
    try {
        let query = `SELECT recipe.id AS recipe_id, recipe.name AS recipe_name, recipe.image AS recipe_image, recipe.created_at AS recipe_date, users.id AS user_id, users.name AS name_user, users.image AS user_image FROM recipe INNER JOIN users ON recipe.user_id = users.id WHERE UNACCENT(LOWER(recipe.name)) LIKE '%' || $1 || '%'`

        const params = [recipe_name];
        if (categories.length > 0) {
            query += ` AND recipe.id IN (SELECT recipe_id FROM category WHERE UNACCENT(LOWER(category.name)) = ANY($2))`;
            params.push(categories);
        }

        const result = await client.query(query, params);
        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const createRecipeQuery = async (name, ingredients, steps, category, image, login) => {
    const client = await connectToDatabase();
    try {
        await client.query('BEGIN');
        const recipeInsertResult = await client.query('INSERT INTO recipe (name, image, user_id, created_at) VALUES ($1, $2, $3, DEFAULT) RETURNING id', [name, image, login]);

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
    searchRecipeQuery,
    createRecipeQuery,
}