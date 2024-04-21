const { connectToDatabase } = require("../database/postgresql");

const getFavoritesQuery = async (user_id) => {
    const client = await connectToDatabase();
    try {
        const result = await client.query('SELECT recipe.id AS recipe_id, recipe.name AS recipe_name, recipe.image AS recipe_image, recipe.created_at AS recipe_date, users.id AS user_id, users.name AS name_user, users.image AS user_image FROM recipe INNER JOIN users ON recipe.user_id = users.id WHERE recipe.id IN (SELECT recipe_id FROM favorite WHERE user_id = $1)', [user_id]);

        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const addFavoriteQuery = async (recipe_id, user_id) => {
    const client = await connectToDatabase();
    try {
        const query = "INSERT INTO favorite (user_id, recipe_id) VALUES ($1, $2)"
        await client.query(query, [user_id, recipe_id]);
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const delFavoriteQuery = async (recipe_id, user_id) => {
    const client = await connectToDatabase();
    try {
        const query = "DELETE FROM favorite WHERE user_id = $1 AND recipe_id = $2"
        await client.query(query, [user_id, recipe_id]);
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}
module.exports = {
    getFavoritesQuery,
    addFavoriteQuery,
    delFavoriteQuery,
}