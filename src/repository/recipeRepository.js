/*const { connectToDatabase } = require("../database/postgresql");

const createRecipeQuery = async (name, ingredient, step, category, image, login) => {
    const client = await connectToDatabase();
    try {
        await client.query('BEGIN');
        await client.query('INSERT INTO recipe (name, image, user_id) VALUES ($1, $2, $3)', [name, image, login.id]);
        

        console.log("Dados inseridos com sucesso!");
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    createRecipeQuery,
}*/