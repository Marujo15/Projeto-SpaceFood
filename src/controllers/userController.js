const jwt = require('jsonwebtoken');
const { SECRET_KEY, SESSION_DURATION } = require('../config');
const userService = require('../service/userService');
const validator = require('../utils/userValidator');

const getLogin = async (req, res) => {
    const user = req.user
    return res.json(user);
}

const clearCookies = (req, res) => {
    res.clearCookie('session_id')
    res.status(200).json({ success: true })
}

const registerUser = async (req, res) => {
    try {
        let { name, username, email, password } = req.body;

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

        await userService.registerUserService(name, username, email, password);

        res.status(201).json({ message: 'Usuário criado com sucesso', status: 201 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
};

const checkUsername = async (req, res, next) => {
    try {
        const username = req.params.username;

        if (validator.isEmpty(username)) {
            const error = new Error("O nome de usuário não pode ser vazio.");
            error.status = 400;
            throw error;
        }
        if (validator.hasSpace(username)) {
            const error = new Error("O nome de usuário não pode conter espaços.");
            error.status = 400;
            throw error;
        }
        if (!validator.usernameSize(username)) {
            const error = new Error("O nome de usuário não pode ser maior que 20 caracteres.");
            error.status = 422;
            throw error;
        }

        const exists = await userService.checkUsernameExistsService(username);

        res.status(200).json({ exists });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
};

const checkEmail = async (req, res) => {
    try {
        const email = req.params.email;

        if (validator.isEmpty(email)) {
            const error = new Error("O email não pode estar vazio.");
            error.status = 400;
            throw error;
        }

        if (!validator.isEmail(email)) {
            const error = new Error("O email não é válido.");
            error.status = 400;
            throw error;
        }
        if (!validator.emailSize(email)) {
            const error = new Error("O email não pode ser maior que 100 caracteres.");
            error.status = 422;
            throw error;
        }

        const exists = await userService.checkEmailExistsService(email);
        res.status(200).json({ exists });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
};

const login = async (req, res) => {
    try {
        let { username, password } = req.body;

        username = username.trim();
        password = password.trim();

        if (validator.isEmpty(username) || validator.isEmpty(password)) {
            const error = new Error("Não pode ter campos vazios.");
            error.status = 400;
            throw error;
        }

        const user = await userService.loginService(username, password);
        // Gera o token JWT
        const sessionToken = jwt.sign({ user }, SECRET_KEY, { expiresIn: SESSION_DURATION });

        // Envia o token JWT como resposta ao cliente
        res.cookie('session_id', sessionToken, { maxAge: 900000, httpOnly: true })
        res.status(200).json({ sessionToken });

    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
};

module.exports = {
    registerUser,
    checkUsername,
    checkEmail,
    login,
    getLogin,
    clearCookies,
};
