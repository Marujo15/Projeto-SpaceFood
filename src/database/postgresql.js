const { Client } = require("pg");
const config = require('../config');


async function connectToDatabase() {
  const client = new Client({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    port: 5432,
  });

  try {
    await client.connect();
    console.log('Conexão bem sucedida!');
    return client;
  } catch (error) {
    console.error('Erro de conexão: ', error);
    throw error;
  }
}

connectToDatabase();

module.exports = { connectToDatabase }
