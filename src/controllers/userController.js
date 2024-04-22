const jwt = require('jsonwebtoken');
const { SECRET_KEY, SESSION_DURATION } = require('../config');
const fs = require('fs');
const path = require('path');

const userService = require('../service/userService');
const validator = require('../utils/userValidator');

const getPerfil = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const result = await userService.getPerfilService(user_id);
        res.status(200).json({ data: result, status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
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

const updatePerfil = async (req, res) => {
    try {
        const { name, username, biography } = req.body;

        const updates = {};
        if (name) updates.name = name.trim();
        if (username) updates.username = username.trim();
        if (biography) updates.biography = biography.trim();

        if (req.file) {
            updates.image = req.file.filename;
        }

        if (updates.name) {
            if (validator.isEmpty(updates.name)) {
                const error = new Error("Nome não pode estar vazio.");
                error.status = 400;
                throw error;
            }

            if (!validator.nameSize(updates.name)) {
                const error = new Error("O nome não pode ser maior que 100 caracteres.");
                error.status = 422;
                throw error;
            }
        }

        if (updates.username) {
            if (validator.isEmpty(updates.username)) {
                const error = new Error("Nome de usuário não pode estar vazio.");
                error.status = 400;
                throw error;
            }

            if (validator.hasSpace(updates.username)) {
                const error = new Error("Nome de usuário não pode conter espaços.");
                error.status = 400;
                throw error;
            }

            if (!validator.usernameSize(updates.username)) {
                const error = new Error("O nome de usuário não pode ser maior que 20 caracteres.");
                error.status = 422;
                throw error;
            }
        }

        if (updates.biography) {
            if (!validator.biographySize(updates.biography)) {
                const error = new Error("O nome de usuário não pode ser maior que 20 caracteres.");
                error.status = 422;
                throw error;
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(200).json({ message: 'Nenhuma alteração feita.', status: 200 });
        }

        let user_id = req.cookies.session_id;
        user_id = jwt.verify(user_id, SECRET_KEY);
        user_id = user_id.user.id;

        const oldImage = await userService.updatePerfilService(user_id, updates);

        if(updates.image) {
            const image = path.join(__dirname, '..', 'uploads', oldImage);
            fs.unlink(image, (err) => {
                if (err) {
                    console.error('Imagem não encontrada.');
                }
            });
        }

        res.status(200).json({ message: 'Usuário atualizado com sucesso', status: 200 });
        
    } catch (error) {
        if (req.file) {
            const image = path.join(__dirname, '..', 'uploads', req.file.filename);
            fs.unlink(image, (err) => {
                if (err) {
                    console.error('Erro ao excluir o imagem:', err);
                }
                console.log('Imagem excluída com sucesso.');
            });
        }
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

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
    getPerfil,
    checkUsername,
    checkEmail,
    registerUser,
    login,
    clearCookies,
    updatePerfil,
};
