const commentaryService = require('../service/commentaryService');
const validator = require('../utils/commentaryValidator');
const jwt = require('jsonwebtoken');
const config = require('../config');

const getCommentaries = async (req, res) => {
    try {
        const recipeId = req.params.recipe_id;

        const result = await commentaryService.getCommentaryService(recipeId);

        res.status(200).json({ data: result, status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

const addCommentary = async (req, res) => {
    try {
        const recipeId = req.params.recipe_id;

        const commentaryText = (req.body.commentary).trim();

        if(validator.isEmpty(commentaryText)) {
            const error = new Error("O comentário não pode estar vazio.");
            error.status = 400;
            throw error;
        }

        if(!validator.commentarySize(commentaryText)) {
            const error = new Error("O comentário não pode ter mais de 280 caracteres.");
            error.status = 400;
            throw error;
        }

        let user_id = req.cookies.session_id;
        user_id = jwt.verify(user_id, config.SECRET_KEY);
        user_id = user_id.user.id;

        await commentaryService.addCommentaryService(recipeId, user_id, commentaryText);
        res.status(200).json({ message: "Comentário adicionado com sucesso.", status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

module.exports = {
    getCommentaries,
    addCommentary,
}