const bcrypt = require('bcryptjs');

// Hash fornecido
const hash = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

// Lista de senhas comuns para testar
const commonPasswords = [
  'admin123',
  'admin',
  '123456',
  'password',
  'admin@mundodosbots.com.br',
  'mundodosbots',
  'MundoDosBots2024',
  'MundoDosBots',
  'admin@mundodosbots.com',
  'Hits#4546',
  'password123',
  'admin2024',
  '12345678',
  'qwerty',
  'senha123',
  'senha',
  'teste',
  'teste123'
];

async function checkPassword() {
  console.log('🔍 Testando senhas comuns contra o hash...');
  console.log('');
  console.log('📋 Hash:', hash);
  console.log('');
  
  let found = false;
  
  for (const password of commonPasswords) {
    try {
      const isValid = await bcrypt.compare(password, hash);
      if (isValid) {
        console.log('✅ SENHA ENCONTRADA!');
        console.log('');
        console.log('🎯 Credenciais:');
        console.log(`   📧 Email: admin@mundodosbots.com.br (ou admin@mundodosbots.com)`);
        console.log(`   🔑 Senha: ${password}`);
        console.log('');
        found = true;
        break;
      }
    } catch (error) {
      // Continuar testando outras senhas
    }
  }
  
  if (!found) {
    console.log('❌ Nenhuma senha comum funcionou.');
    console.log('');
    console.log('💡 Opções:');
    console.log('   1. Resetar a senha no banco de dados');
    console.log('   2. Criar um novo usuário admin');
    console.log('   3. Verificar se há outro usuário admin no banco');
  }
}

// Executar
checkPassword();



