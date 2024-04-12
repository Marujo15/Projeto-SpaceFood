const { Client } = require("pg");
const config = require('../config');

async function connectToDatabase() {
  const client = new Client({
    user: "postgres",
    host: "45.63.13.91",
    database: "spacefood",
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
