const hashPassword = require('../utils/hashPassword');
const userRepository = require('../repository/userRepository');
const validator = require('../utils/userValidator');

const registerUserService = async (name, username, email, password) => {
    try {
        name = name.trim();
        username = username.trim();
        email = email.trim();
        password = password.trim();

        if (validator.isEmpty(name) || validator.isEmpty(username) || validator.isEmpty(email) || validator.isEmpty(password)) {
            const error = new Error("Não pode ter campos vazios.");
            error.status = 400;
            throw error;
        }

        if (!validator.isEmail(email)) {
            const error = new Error("O email não é válido.");
            error.status = 400;
            throw error;
        }

        if (validator.hasSpace(password) || validator.hasSpace(username)) {
            const error = new Error("Campos de senha e username não podem conter espaços.");
            error.status = 400;
            throw error;
        }

        if (!validator.nameSize(name)) {
            const error = new Error("O nome não pode ser maior que 100 caracteres.");
            error.status = 422;
            throw error;
        }
        
        if (!validator.usernameSize(username)) {
            const error = new Error("O nome de usuário não pode ser maior que 20 caracteres.");
            error.status = 422;
            throw error;
        }
        
        if (!validator.emailSize(email)) {
            const error = new Error("O email não pode ser maior que 100 caracteres.");
            error.status = 422;
            throw error;
        }

        if (!validator.hasSpecialChars(name) || !validator.hasSpecialChars(username) || !validator.hasSpecialChars(email) || !validator.hasSpecialChars(password)) {
            const error = new Error("Os campos não podem conter caracteres especiais.");
            error.status = 422;
            throw error;
        }

        const hashedPassword = await hashPassword(password);

        await userRepository.registerUserQuery(name, username, email, hashedPassword);

    } catch (error) {
        if(error.status === 409) {
            error.message = "Este email ou nome de usuário já existe."
        } else {
            error.message = error.message || "Ocorreu um erro interno.";
        }
        error.status = error.status || 500;
        throw error;
    }
};

const loginService = async (username, password) => {
    try {
        username = username.trim();
        password = password.trim();
        if (validator.isEmpty(username) || validator.isEmpty(password)) {
            const error = new Error("Não pode ter campos vazios.");
            error.status = 400;
            throw error;
        }
        await userRepository.loginQuery( username, password);
    } catch (error) {
        error.status = error.status || 500;
        throw error;
    }
};

module.exports = {
    registerUserService,
    loginService,
}
