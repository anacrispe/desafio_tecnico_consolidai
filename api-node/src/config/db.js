const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});



module.exports = pool;
/*
pool.connect()
  .then(() => {
    console.log("✅ Conexão com o banco estabelecida com sucesso!");
    return pool.end();
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar com o banco:", err.message);
  });
  
*/
// test-db.js

