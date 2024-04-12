const jwt = require('jsonwebtoken');
const { SECRET_KEY, SESSION_DURATION } = require('../config');
const userService = require('../service/userService');
const userRepository = require('../repository/userRepository')

const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        
        await userService.registerUserService(name, username, email, password);
        
        res.status(201).json({ message: 'Usuário criado com sucesso', status: 201 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
};
const checkUsername = async (req, res, next) => {
    const username = req.params.username;
    try {
        const exists = await userRepository.checkUsernameExists(username);
        res.status(200).json({ exists });
    } catch (error) {
        next(error);
    }
};

const checkEmail = async (req, res, next) => {
    const email = req.params.username;
    try {
        const exists = await userRepository.checkUsernameExists(email);
        res.status(200).json({ exists });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.loginService(username, password);

        // Gera o token JWT
        const sessionToken = jwt.sign({ user }, SECRET_KEY, { expiresIn: SESSION_DURATION });

        // Envia o token JWT como resposta ao cliente
        res.status(200).json({ sessionToken });
    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        res.status(error.code || 500).json({ error: 'Erro ao tentar fazer login', status: error.code || 500 });
    }
};

module.exports = {
    registerUser,
    checkUsername,
    checkEmail,
    login,
};
