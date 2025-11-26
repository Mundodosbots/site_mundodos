const { pool } = require('../config/database');

async function insertDefaultSettings() {
  try {
    console.log('🔧 Inserindo configurações padrão...');
    
    const defaultSettings = [
      // Configurações Pabbly
      { key: 'pabbly.api_key', value: '' },
      { key: 'pabbly.base_url', value: 'https://api.pabbly.com/v1' },
      { key: 'pabbly.webhook_url', value: '' },
      { key: 'pabbly.workflow_id', value: '' },
      { key: 'pabbly.auto_schedule_enabled', value: 'false' },
      { key: 'pabbly.auto_schedule_time', value: '09:00' },
      { key: 'pabbly.timezone', value: 'America/Sao_Paulo' },
      
      // Configurações OpenAI
      { key: 'openai.api_key', value: '' },
      { key: 'openai.model', value: 'gpt-3.5-turbo' },
      { key: 'openai.max_tokens', value: '1000' },
      { key: 'openai.temperature', value: '0.7' },
      { key: 'openai.enabled', value: 'false' },
      
      // Configurações Gemini
      { key: 'gemini.api_key', value: '' },
      { key: 'gemini.model', value: 'gemini-pro' },
      { key: 'gemini.max_tokens', value: '1000' },
      { key: 'gemini.temperature', value: '0.7' },
      { key: 'gemini.enabled', value: 'false' },
      
      // Configurações Gerais
      { key: 'general.site_name', value: 'Mundo dos Bots' },
      { key: 'general.site_description', value: 'Especialistas em Chatbots e Automação' },
      { key: 'general.default_language', value: 'pt' },
      { key: 'general.contact_email', value: 'contato@mundodosbots.com.br' },
      { key: 'general.whatsapp_number', value: '+5511999999999' }
    ];

    for (const setting of defaultSettings) {
      await pool.execute(
        `INSERT INTO site_settings (setting_key, setting_value, setting_type, description) 
         VALUES (?, ?, 'text', 'Configuração automática') 
         ON DUPLICATE KEY UPDATE 
         setting_value = VALUES(setting_value), 
         updated_at = NOW()`,
        [setting.key, setting.value]
      );
    }

    console.log('✅ Configurações padrão inseridas com sucesso!');
    console.log('');
    console.log('📋 Configurações criadas:');
    console.log('   🔧 Pabbly Connect (7 configurações)');
    console.log('   🤖 OpenAI (5 configurações)');
    console.log('   🌐 Google Gemini (5 configurações)');
    console.log('   ⚙️  Configurações Gerais (5 configurações)');
    console.log('');
    console.log('🌐 URLs de acesso:');
    console.log('   🔗 Admin Dashboard: http://localhost:3000/admin/dashboard');
    console.log('   🔗 Configurações: http://localhost:3000/admin/settings');

  } catch (error) {
    console.error('❌ Erro ao inserir configurações:', error.message);
  } finally {
    await pool.end();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  insertDefaultSettings();
}

module.exports = { insertDefaultSettings };
