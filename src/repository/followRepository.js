const { connectToDatabase } = require("../database/postgresql");

const getFollowersQuery = async (user_id) => {
    const client = await connectToDatabase();
    try {
        const result = await client.query(`
            SELECT 
                users.id AS user_id, 
                users.name AS user_name, 
                users.username AS user_username, 
                users.image AS user_image 
            FROM 
                users 
            INNER JOIN 
                followed_follower ON followed_follower.follower_id = users.id 
            WHERE 
                followed_follower.followed_id = $1
        `, [user_id]);

        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const getFollowedQuery = async (user_id) => {
    const client = await connectToDatabase();
    try {
        const result = await client.query(`
            SELECT 
                users.id AS user_id, 
                users.name AS user_name, 
                users.username AS user_username, 
                users.image AS user_image 
            FROM 
                users 
            INNER JOIN 
                followed_follower ON followed_follower.followed_id = users.id 
            WHERE 
                followed_follower.follower_id = $1
        `, [user_id]);

        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const followQuery = async (followed, user_id) => {
    const client = await connectToDatabase();
    try {
        const query = "INSERT INTO followed_follower (followed_id, follower_id) VALUES ($1, $2)"
        await client.query(query, [followed, user_id]);
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const unfollowQuery = async(followed, user_id) => {
    const client = await connectToDatabase();
    try {
        const query = "DELETE FROM followed_follower WHERE followed_id = $1 AND follower_id = $2"
        await client.query(query, [followed, user_id]);
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    getFollowersQuery,
    getFollowedQuery,
    followQuery,
    unfollowQuery,
}