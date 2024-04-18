const { connectToDatabase } = require("../database/postgresql");

const getCommentaryQuery = async (recipe_id) => {
    const client = await connectToDatabase();
    try {
        const result = await client.query('SELECT commentary.id AS commentary_id, commentary.commentary AS commentary_text, commentary.created_at AS commentary_date, users.id AS user_id, users.name AS name_user, users.image AS user_image FROM commentary INNER JOIN users ON commentary.user_id = users.id WHERE commentary.recipe_id = $1', [recipe_id]);

        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const addCommentaryQuery = async (recipe_id, user_id, commentaryText) => {
    const client = await connectToDatabase();
    try {
        const query = "INSERT INTO commentary (commentary, recipe_id, user_id, created_at) VALUES ($1, $2, $3, DEFAULT)";
        await client.query(query, [commentaryText, recipe_id, user_id]);
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    getCommentaryQuery,
    addCommentaryQuery,
}