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
  queueLimit: 0,
  connectTimeout: 30000, // 30 segundos
  acquireTimeout: 30000, // 30 segundos
  timeout: 30000, // 30 segundos
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Pool de conexões
const pool = mysql.createPool(dbConfig);

// Testar conexão com retry
const testConnection = async (maxRetries = 5, delay = 5000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
  try {
      console.log(`🔄 Tentativa ${attempt}/${maxRetries} de conexão com MySQL...`);
    const connection = await pool.getConnection();
    console.log('✅ Conexão com MySQL estabelecida com sucesso!');
    connection.release();
      return true;
  } catch (error) {
      console.error(`❌ Erro ao conectar com MySQL (tentativa ${attempt}/${maxRetries}):`, error.message);
      
      if (attempt < maxRetries) {
        console.log(`⏳ Aguardando ${delay/1000} segundos antes da próxima tentativa...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('❌ Falha ao conectar com MySQL após todas as tentativas.');
        console.error('🔧 Verifique:');
        console.error('   1. Se o IP do MySQL está correto:', process.env.DB_HOST);
        console.error('   2. Se o MySQL permite conexões remotas');
        console.error('   3. Se o firewall permite conexões na porta 3306');
        console.error('   4. Se as credenciais estão corretas');
    process.exit(1);
      }
    }
  }
};

module.exports = {
  pool,
  testConnection
};
