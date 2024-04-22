const { connectToDatabase } = require("../database/postgresql");

const getLikeRecipeQuery = async (recipe_id) => {
    const client = await connectToDatabase();
    try {
        const result = await client.query(`
            SELECT 
                users.id AS user_id, 
                users.name AS user_name, 
                users.username AS user_username, 
                users.image AS user_image 
            FROM 
                users 
            INNER JOIN 
                recipe_like ON recipe_like.user_id = users.id 
            WHERE 
                recipe_like.recipe_id = $1
        `, [recipe_id]);

        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const likeRecipeQuery = async (recipe_id, user_id) => {
    const client = await connectToDatabase();
    try {
        const query = "INSERT INTO recipe_like (recipe_id, user_id) VALUES ($1, $2)"
        await client.query(query, [recipe_id, user_id]);
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const removeLikeRecipeQuery = async(recipe_id, user_id) => {
    const client = await connectToDatabase();
    try {
        const query = "DELETE FROM recipe_like WHERE recipe_id = $1 AND user_id = $2"
        await client.query(query, [recipe_id, user_id]);
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    getLikeRecipeQuery,
    likeRecipeQuery,
    removeLikeRecipeQuery,
}