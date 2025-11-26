const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

async function checkAdminCredentials() {
  try {
    console.log('🔍 Verificando credenciais do admin...');
    
    // Buscar usuário admin
    const [admins] = await pool.execute(
      'SELECT * FROM users WHERE role = "admin" AND is_active = 1'
    );

    if (admins.length === 0) {
      console.log('❌ Nenhum usuário admin encontrado');
      return;
    }

    const admin = admins[0];
    console.log('✅ Usuário admin encontrado:');
    console.log(`   📧 Email: ${admin.email}`);
    console.log(`   👤 Nome: ${admin.name}`);
    console.log(`   🔑 Role: ${admin.role}`);
    console.log(`   📅 Criado em: ${admin.created_at}`);
    console.log('');

    // Testar senhas comuns
    const commonPasswords = [
      'admin123',
      'admin',
      '123456',
      'password',
      'admin@mundodosbots.com',
      'mundodosbots'
    ];

    console.log('🔐 Testando senhas comuns...');
    for (const password of commonPasswords) {
      const isValid = await bcrypt.compare(password, admin.password);
      if (isValid) {
        console.log(`✅ Senha encontrada: "${password}"`);
        console.log('');
        console.log('🎯 CREDENCIAIS DE ACESSO:');
        console.log(`   📧 Email: ${admin.email}`);
        console.log(`   🔑 Senha: ${password}`);
        console.log('');
        console.log('🌐 URLs de acesso:');
        console.log(`   🔗 Frontend: http://localhost:3000`);
        console.log(`   🔗 Login Admin: http://localhost:3000/admin/login`);
        console.log(`   🔗 Dashboard Admin: http://localhost:3000/admin/dashboard`);
        return;
      }
    }

    console.log('❌ Nenhuma senha comum funcionou');
    console.log('💡 Você pode resetar a senha no banco de dados');

  } catch (error) {
    console.error('❌ Erro ao verificar credenciais:', error.message);
  } finally {
    await pool.end();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  checkAdminCredentials();
}

module.exports = { checkAdminCredentials };
