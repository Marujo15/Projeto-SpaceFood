const { connectToDatabase } = require("../database/postgresql");

const getPerfilQuery = async (user_id) => {
    const client = await connectToDatabase();
    try {
        const result = await client.query(`
            SELECT 
                users.id AS user_id,
                users.name AS user_name,
                users.username AS user_username,
                users.biography AS user_biography,
                users.image AS user_image,
                (
                    SELECT COUNT(*) 
                    FROM followed_follower 
                    WHERE follower_id = users.id
                ) AS followers_count,
                (
                    SELECT COUNT(*) 
                    FROM followed_follower 
                    WHERE followed_id = users.id
                ) AS following_count
            FROM
                users
            WHERE 
                users.id = $1
        `, [user_id]);

        return result.rows[0];
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const registerUserQuery = async (name, username, email, password) => {
    const query = "INSERT INTO users (name, username, email, password, created_at) VALUES ($1, $2, $3, $4, DEFAULT)"
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

const updatePerfilRepository = async (user_id, updates) => {
    const client = await connectToDatabase();
    try {
        let oldImage;
        if (updates.image) {
            const result = await client.query("SELECT image FROM users WHERE id = $1", [user_id]);
            if (result.rows.length > 0) {
                oldImage = result.rows[0].image;
            }
        }

        const columns = Object.keys(updates);
        const values = Object.values(updates);

        const setClause = columns.map((column, index) => `${column} = $${index + 1}`).join(', ');

        await client.query(`
            UPDATE users
            SET ${setClause}, updated_at = DEFAULT
            WHERE id = $${columns.length + 1}
        `, [...values, user_id]);

        return oldImage;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    getPerfilQuery,
    registerUserQuery,
    checkUsernameExists,
    checkEmailExists,
    loginQuery,
    updatePerfilRepository,
}