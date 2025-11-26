const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mundo_dos_bots',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Pool de conexões
const pool = mysql.createPool(dbConfig);

// Testar conexão
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexão com MySQL estabelecida com sucesso!');
    connection.release();
  } catch (error) {
    console.error('❌ Erro ao conectar com MySQL:', error.message);
    process.exit(1);
  }
};

module.exports = {
  pool,
  testConnection
};
