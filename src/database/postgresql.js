const { Pool } = require("pg");
const config = require('../config');

const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: 5432,
});

async function connectToDatabase() {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error('Erro de conexão: ', error);
    throw error;
  }
}

module.exports = { connectToDatabase }