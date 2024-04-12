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

const loginQuery = async (username, password) => {
    const query = 'SELECT * FROM users WHERE username = $1';

    try {
        const client = await connectToDatabase();
        const result = await client.query(query, [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (isValidPassword) {
                return user;
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
    loginQuery,
}
