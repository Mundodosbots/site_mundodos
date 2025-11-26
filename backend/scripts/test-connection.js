const { testConnection, pool } = require('../config/database');

async function testDatabaseConnection() {
  try {
    console.log('🔍 Testando conexão com o banco de dados...');
    console.log('');
    console.log('📊 Configurações:');
    console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`   Port: ${process.env.DB_PORT || 3306}`);
    console.log(`   User: ${process.env.DB_USER || 'root'}`);
    console.log(`   Database: ${process.env.DB_NAME || 'mundo_dos_bots'}`);
    console.log('');
    
    // Testar conexão
    await testConnection();
    
    // Testar query simples
    const [rows] = await pool.execute('SELECT 1 as test');
    console.log('✅ Query de teste executada com sucesso!');
    console.log('');
    
    // Verificar se existem tabelas
    const [tables] = await pool.execute('SHOW TABLES');
    console.log(`✅ Banco de dados conectado! Encontradas ${tables.length} tabelas.`);
    console.log('');
    
    // Verificar se existe usuário admin
    try {
      const [users] = await pool.execute('SELECT * FROM users WHERE role = "admin" AND is_active = 1 LIMIT 1');
      if (users.length > 0) {
        console.log('✅ Usuário admin encontrado:');
        console.log(`   📧 Email: ${users[0].email}`);
        console.log(`   👤 Nome: ${users[0].name}`);
      } else {
        console.log('⚠️  Nenhum usuário admin encontrado.');
        console.log('💡 Execute: node scripts/create-admin.js');
      }
    } catch (error) {
      console.log('⚠️  Tabela users não encontrada ou erro ao verificar usuários.');
    }
    
    console.log('');
    console.log('🎉 Conexão com banco de dados está funcionando!');
    console.log('✅ Você pode reiniciar o backend agora.');
    
    await pool.end();
    process.exit(0);
    
  } catch (error) {
    console.error('');
    console.error('❌ Erro ao conectar com o banco de dados:');
    console.error(`   ${error.message}`);
    console.error('');
    console.error('🔧 Verifique:');
    console.error('   1. Se o IP do servidor está correto');
    console.error('   2. Se o firewall permite conexões na porta 3306');
    console.error('   3. Se as credenciais estão corretas');
    console.error('   4. Se o banco de dados existe');
    
    await pool.end();
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  testDatabaseConnection();
}

module.exports = { testDatabaseConnection };





