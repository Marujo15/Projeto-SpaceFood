const { connectToDatabase } = require("../database/postgresql");

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

module.exports = {
    addFavoriteQuery,
}