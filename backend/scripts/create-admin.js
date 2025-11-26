const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

async function createAdminUser() {
  try {
    console.log('🔍 Verificando se existe usuário admin...');
    
    // Verificar se já existe um admin
    const [existingAdmins] = await pool.execute(
      'SELECT * FROM users WHERE role = "admin" AND is_active = 1'
    );

    if (existingAdmins.length > 0) {
      console.log('✅ Usuário admin já existe:');
      existingAdmins.forEach(admin => {
        console.log(`   📧 Email: ${admin.email}`);
        console.log(`   👤 Nome: ${admin.name}`);
        console.log(`   🔑 Role: ${admin.role}`);
      });
      return;
    }

    // Criar usuário admin
    const adminData = {
      name: 'Administrador',
      email: 'admin@mundodosbots.com',
      password: 'admin123',
      role: 'admin',
      is_active: 1
    };

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(adminData.password, 12);

    // Inserir usuário admin
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role, is_active, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [adminData.name, adminData.email, hashedPassword, adminData.role, adminData.is_active]
    );

    console.log('✅ Usuário admin criado com sucesso!');
    console.log(`   📧 Email: ${adminData.email}`);
    console.log(`   🔑 Senha: ${adminData.password}`);
    console.log(`   👤 Nome: ${adminData.name}`);
    console.log(`   🔑 Role: ${adminData.role}`);
    console.log('');
    console.log('⚠️  IMPORTANTE: Altere a senha após o primeiro login!');

  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error.message);
  } finally {
    await pool.end();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  createAdminUser();
}

module.exports = { createAdminUser };
