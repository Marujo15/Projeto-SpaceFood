const { connectToDatabase } = require("../database/postgresql");

const registerUserQuery = async (name, username, email, password) => {
    const query = "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4)"
    const client = await connectToDatabase();
    try {
        await client.query(query, [name, username, email, password]);
        console.log("Dados inseridos com sucesso!");
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
};

const checkUsernameExists = async (username) => {
    const query = 'SELECT COUNT(*) FROM users WHERE username = $1';
    const client = await connectToDatabase();
    try {
        const result = await client.query(query, [username]);
        return result.rows;
    } catch (error) {
        console.error("Erro ao verificar se existe o nome de usuário:", error);
        throw error;
    } finally {
        client.release();
    }
};

const checkEmailExists = async (email) => {
    const query = 'SELECT COUNT(*) FROM users WHERE email = $1';
    const client = await connectToDatabase();
    try {
        const result = await client.query(query, [email]);
        return result.rows;
    } catch (error) {
        console.error("Erro ao verificar se existe o email :", error);
        throw error;
    } finally {
        client.release();
    }
};

const loginQuery = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const client = await connectToDatabase();
    try {
        const result = await client.query(query, [username]);
        return result;
    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    registerUserQuery,
    checkUsernameExists,
    checkEmailExists,
    loginQuery,
}