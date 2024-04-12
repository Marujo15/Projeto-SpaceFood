const { connectToDatabase } = require("../database/postgresql");
const bcrypt = require("bcrypt")

const registerUserQuery = async (name, username, email, password) => {
    const query = "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4)"
    try {
        const client = await connectToDatabase();
        await client.query(query, [name, username, email, password]);
        console.log("Dados inseridos com sucesso!");
    } catch (error) {
        if (error.code === '23505') {
            const error = new Error("Este email ou nome de usuário já está em uso.");
            error.status = 409;
            throw error;
        }

        console.error("Erro ao inserir os dados: ", error);
        throw error;
    }
};

const checkUsernameExists = async (username) => {
    const query = 'SELECT COUNT(*) FROM users WHERE username = $1';
    try {
        const client = await connectToDatabase();
        const result = await client.query(query, [username]);
        return result.rows[0].count > 0;
    } catch (error) {
        console.error("Erro ao verificar se existe o nome de usuário:", error);
        throw error;
    }
};

const checkEmailExists = async (email) => {
    const query = 'SELECT COUNT(*) FROM users WHERE email = $1';
    try {
        const client = await connectToDatabase();
        const result = await client.query(query, [email]);
        return result.rows[0].count > 0;
    } catch (error) {
        console.error("Erro ao verificar se existe o email :", error);
        throw error;
    }
};

const loginQuery = async (username, password) => {
    const query = 'SELECT * FROM users WHERE username = $1';

    try {
        const client = await connectToDatabase();
        const result = await client.query(query, [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isValidPassword = await bcrypt.compare(password, user.password.slice(0,60));

            if (isValidPassword) {
                return user; // { username , password }
            } else {
                throw { code: 404, message: 'Erro ao tentar fazer login, tente alterar login e/ou senha.' };
            }
        } else {
            throw { code: 404, message: 'Erro ao tentar fazer login, tente alterar login e/ou senha.' };
        }
    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        throw error;
    }
};

module.exports = {
    registerUserQuery,
    checkUsernameExists,
    checkEmailExists,
    loginQuery,
}
