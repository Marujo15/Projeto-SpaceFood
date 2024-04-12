require('dotenv').config();

const config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || "chaveQualquer",
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    SESSION_DURATION: process.env.SESSION_DURATION || "1h",
}

module.exports = config;
