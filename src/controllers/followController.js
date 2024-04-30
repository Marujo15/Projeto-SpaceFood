const followService = require('../service/followService');
const jwt = require('jsonwebtoken');
const config = require('../config');

const getFollowers = async(req, res) => {
    try {
        const user_id = req.params.user_id;
        
        const result = await followService.getFollowersService(user_id);

        res.status(200).json({ data: result, status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

const getFollowed = async(req, res) => {
    try {
        const user_id = req.params.user_id;
        
        const result = await followService.getFollowedService(user_id);

        res.status(200).json({ data: result, status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

const follow = async (req, res) => {
    try {
        const followed = req.params.user_id;

        let user_id = req.cookies.session_id;
        user_id = jwt.verify(user_id, config.SECRET_KEY);
        user_id = user_id.user.id;

        await followService.followService(followed, user_id);
        res.status(200).json({ message: "Usuário seguido com sucesso.", status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

const unfollow = async (req, res) => {
    try {
        const followed = req.params.user_id;

        let user_id = req.cookies.session_id;
        user_id = jwt.verify(user_id, config.SECRET_KEY);
        user_id = user_id.user.id;
        await followService.unfollowService(followed, user_id);
        res.status(200).json({ message: "Usuário deixado de seguir com sucesso.", status: 200 });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message, status: error.status || 500 });
    }
}

module.exports = {
    getFollowers,
    getFollowed,
    follow,
    unfollow,
}