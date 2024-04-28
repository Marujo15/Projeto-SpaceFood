const { connectToDatabase } = require("../database/postgresql");

const getAllRecipesQuery = async () => {
    const client = await connectToDatabase();
    try {
        const result = await client.query(`
            SELECT 
                recipe.id AS recipe_id, 
                recipe.name AS recipe_name, 
                recipe.image AS recipe_image, 
                recipe.created_at AS recipe_date, 
                users.id AS user_id, 
                users.name AS name_user, 
                users.image AS user_image 
            FROM 
                recipe 
            INNER JOIN 
                users ON recipe.user_id = users.id
            ORDER BY
                recipe_date DESC
        `);
        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const getRecipeByFollowingQuery = async (user_id) => {
    const client = await connectToDatabase();
    try {
        const result = await client.query(`
            SELECT 
                recipe.id AS recipe_id, 
                recipe.name AS recipe_name, 
                recipe.image AS recipe_image, 
                recipe.created_at AS recipe_date, 
                users.id AS user_id, 
                users.name AS name_user, 
                users.image AS user_image 
            FROM 
                recipe 
            INNER JOIN 
                users ON recipe.user_id = users.id
            INNER JOIN
                followed_follower ON followed_follower.followed_id = users.id 
            WHERE 
                followed_follower.follower_id = $1
            ORDER BY
                recipe_date DESC
        `, [user_id]);
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
        const result = await client.query(`
            SELECT 
                recipe.id AS recipe_id, 
                recipe.name AS recipe_name, 
                recipe.image AS recipe_image, 
                recipe.created_at AS recipe_date, 
                ARRAY_AGG(DISTINCT ingredient.name) AS ingredients, 
                ARRAY_AGG(DISTINCT preparation_method.step) AS preparation_method, 
                ARRAY_AGG(DISTINCT category.name) AS categories 
            FROM 
                recipe 
            LEFT JOIN 
                ingredient ON recipe.id = ingredient.recipe_id 
            LEFT JOIN 
                preparation_method ON recipe.id = preparation_method.recipe_id 
            LEFT JOIN 
                category ON recipe.id = category.recipe_id 
            WHERE 
                recipe.id = $1
            GROUP BY 
                recipe.id
        `, [recipe_id]);

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
        let query = `
            SELECT 
                recipe.id AS recipe_id, 
                recipe.name AS recipe_name, 
                recipe.image AS recipe_image, 
                recipe.created_at AS recipe_date, 
                users.id AS user_id, 
                users.name AS name_user, 
                users.image AS user_image 
            FROM 
                recipe 
            INNER JOIN 
                users ON recipe.user_id = users.id 
            WHERE 
                UNACCENT(LOWER(recipe.name)) LIKE '%' || $1 || '%'
        `;

        const params = [recipe_name];

        if (categories.length > 0) {
            query += `
                AND recipe.id IN (
                    SELECT 
                        recipe_id 
                    FROM 
                        category 
                    WHERE 
                        UNACCENT(LOWER(category.name)) = ANY($2)
                )
                ORDER BY
                    recipe_date DESC
            `;
            params.push(categories);
        } else {
            query += `
            ORDER BY
                recipe_date DESC
            `;
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
    getRecipeByFollowingQuery,
    getRecipeDetailedQuery,
    searchRecipeQuery,
    createRecipeQuery,
}