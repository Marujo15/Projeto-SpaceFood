require('dotenv').config();

const config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
    ADDRESS: process.env.ADDRESS || 'localhost',
    SECRET_KEY: process.env.SECRET_KEY || "chaveQualquer",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "postgres",
    DB_NAME: process.env.DB_NAME || "spacefood",
    DB_PASSWORD: process.env.DB_PASSWORD || "jiejie",
    SESSION_DURATION: process.env.SESSION_DURATION || "1h",
}

module.exports = config;