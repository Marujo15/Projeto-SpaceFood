const followRepository = require('../repository/followRepository');

const getFollowersService = async (user_id) => {
    try {
        const result = await followRepository.getFollowersQuery(user_id);

        if(result.length === 0) {
            const error = new Error("Este usuário não tem seguidores.");
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

const getFollowedService = async (user_id) => {
    try {
        const result = await followRepository.getFollowedQuery(user_id);

        if(result.length === 0) {
            const error = new Error("Este usuário não está seguindo ninguém.");
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

const followService = async(followed, user_id) => {
    try {
        await followRepository.followQuery(followed, user_id);
        
    } catch (error) {
        if (error.code === '23505') {
            error.message = "Este usuário já está sendo seguido por você.";
            error.status = 409;
        }
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
}

const unfollowService = async (followed, user_id) => {
    try {
        await followRepository.unfollowQuery(followed, user_id);
        
    } catch (error) {
        if (error.code === '02000') {
            error.message = "Usuário não encontrado.";
            error.status = 404;
        }
        error.message = error.message || "Ocorreu um erro interno.";
        error.status = error.status || 500;
        throw error;
    }
}

module.exports = {
    getFollowersService,
    getFollowedService,
    followService,
    unfollowService,
}