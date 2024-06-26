const hashPassword = require('../utils/hashPassword');
const userRepository = require('../repository/userRepository');
const bcrypt = require('bcrypt');

const registerUserService = async (name, username, email, password) => {
    try {
        const hashedPassword = await hashPassword(password);

        await userRepository.registerUserQuery(name, username, email, hashedPassword);

    } catch (error) {
        if (error.code === '23505') {
            error.message = "Este email ou nome de usuário já existe.";
            error.status = 409;
        }
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
};

const getPerfilService = async (user_id) => {
    try {
        const result = await userRepository.getPerfilQuery(user_id);

        if(result === undefined) {
            const error = new Error("Este usuário não existe.");
            error.status = 404;
            throw error;
        }

        return result;
    } catch (error) {
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
}

const checkEmailExistsService = async (email) => {
    try {
        const result = await userRepository.checkEmailExists(email);

        if (result[0].count > 0 ) {
            const error = new Error("Este email já está em uso.");
            error.status = 409;
            throw error;
        }

        return false;

    } catch (error) {
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
};

const checkUsernameExistsService = async (username) => {
    try {
        const result = await userRepository.checkUsernameExists(username);

        if (result[0].count > 0 ) {
            const error = new Error("Este nome de usuário já está em uso.");
            error.status = 409;
            throw error;
        }

        return false;

    } catch (error) {
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
};

const loginService = async (email, password) => {
    try {
        const result = await userRepository.loginQuery(email);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (isValidPassword) {
                return user;
            } else {
                const error = new Error("Login e/ou senha incorretos.");
                error.status = 404;
                throw error;
            }
        } else {
            const error = new Error("Login e/ou senha incorretos.");
            error.status = 404;
            throw error;
        }
    } catch (error) {
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
};

const updatePerfilService = async (user_id, updates) => {
    try {
        const result = await userRepository.updatePerfilRepository(user_id, updates);
        return result;
    } catch (error) {
        if (error.code === '23505') {
            error.message = "Este nome de usuário já existe.";
            error.status = 409;
        }
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
}

module.exports = {
    getPerfilService,
    registerUserService,
    checkEmailExistsService,
    checkUsernameExistsService,
    loginService,
    updatePerfilService,
}
