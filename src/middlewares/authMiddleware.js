const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const authMiddleware = (req, res, next) => {
    const sessionToken = req.cookies.session_id;

    if (sessionToken) {
        try {
            const decoded = jwt.verify(sessionToken, SECRET_KEY);
            req.user = decoded.user;
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Token inválido' });
        }
    } else {
        return res.status(401).json({ error: 'Acesso não autorizado. Faça login para acessar este recurso.' });
    }
};

module.exports = authMiddleware;
