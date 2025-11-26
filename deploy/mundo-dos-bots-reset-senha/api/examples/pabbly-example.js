/**
 * Exemplo de uso da integração Pabbly
 * 
 * Este script demonstra como usar a API para automatizar publicações nas redes sociais
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api/pabbly';

// Função para testar conexão
async function testConnection() {
  try {
    console.log('🔍 Testando conexão com Pabbly...');
    const response = await axios.get(`${API_BASE_URL}/test-connection`);
    console.log('✅ Resultado:', response.data);
    return response.data.success;
  } catch (error) {
    console.error('❌ Erro ao testar conexão:', error.message);
    return false;
  }
}

// Função para verificar status
async function checkStatus() {
  try {
    console.log('📊 Verificando status da integração...');
    const response = await axios.get(`${API_BASE_URL}/status`);
    console.log('✅ Status:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('❌ Erro ao verificar status:', error.message);
    return null;
  }
}

// Função para publicar conteúdo
async function publishContent() {
  try {
    console.log('📱 Publicando conteúdo nas redes sociais...');
    
    const content = {
      content: {
        facebook: "🤖 Transforme seu negócio com chatbots inteligentes! Automatize atendimento, qualifique leads e aumente vendas com IA avançada. #MundoDosBots #Chatbots #Automação",
        instagram: "🤖 Revolucione seu negócio com chatbots inteligentes!\n\nAutomatize atendimento, qualifique leads e aumente vendas com IA avançada.\n\n📖 Link na bio\n\n#MundoDosBots #Chatbots #Automação #IA",
        linkedin: "💼 Transforme seu negócio com chatbots inteligentes!\n\nAutomatize atendimento, qualifique leads e aumente vendas com IA avançada.\n\n🔗 Confira nossas soluções: https://mundodosbots.com.br\n\n#MundoDosBots #Chatbots #Automação #Inovação #Tecnologia"
      },
      image_url: "https://mundodosbots.com.br/assets/chatbot-automation.jpg",
      platforms: ["facebook", "instagram", "linkedin"],
      tags: ["MundoDosBots", "Chatbots", "Automação", "IA"],
      campaign: "mundodosbots",
      language: "pt"
    };

    const response = await axios.post(`${API_BASE_URL}/publish`, content);
    console.log('✅ Conteúdo publicado:', response.data);
    return response.data.success;
  } catch (error) {
    console.error('❌ Erro ao publicar conteúdo:', error.message);
    return false;
  }
}

// Função para agendar publicação
async function schedulePost() {
  try {
    console.log('📅 Agendando publicação...');
    
    // Agendar para amanhã às 9h
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    
    const content = {
      content: {
        facebook: "🚀 Amanhã é dia de inovação! Descubra como nossos chatbots podem transformar seu negócio. #MundoDosBots #Inovação",
        instagram: "🚀 Amanhã é dia de inovação!\n\nDescubra como nossos chatbots podem transformar seu negócio.\n\n📖 Link na bio\n\n#MundoDosBots #Inovação #Tecnologia",
        linkedin: "🚀 Amanhã é dia de inovação!\n\nDescubra como nossos chatbots podem transformar seu negócio.\n\n🔗 Confira nossas soluções: https://mundodosbots.com.br\n\n#MundoDosBots #Inovação #Tecnologia #Futuro"
      },
      scheduled_time: tomorrow.toISOString(),
      timezone: "America/Sao_Paulo",
      platforms: ["facebook", "instagram", "linkedin"],
      tags: ["MundoDosBots", "Inovação", "Tecnologia"],
      campaign: "mundodosbots",
      language: "pt"
    };

    const response = await axios.post(`${API_BASE_URL}/schedule`, content);
    console.log('✅ Publicação agendada:', response.data);
    return response.data.success;
  } catch (error) {
    console.error('❌ Erro ao agendar publicação:', error.message);
    return false;
  }
}

// Função para publicar blog post automaticamente
async function publishBlogPost() {
  try {
    console.log('📝 Publicando blog post automaticamente...');
    
    const blogPost = {
      id: 123,
      title: "Como os Chatbots Estão Revolucionando o Atendimento ao Cliente",
      content: "A inteligência artificial está transformando a forma como as empresas atendem seus clientes. Os chatbots oferecem uma solução eficiente e escalável para automatizar o atendimento...",
      excerpt: "Descubra como a inteligência artificial está transformando a forma como as empresas atendem seus clientes.",
      featured_image: "https://mundodosbots.com.br/assets/blog/chatbots-atendimento.jpg",
      url: "https://mundodosbots.com.br/blog/chatbots-revolucionando-atendimento",
      tags: ["Chatbots", "IA", "Atendimento", "Automação"],
      language: "pt"
    };

    const response = await axios.post(`${API_BASE_URL}/publish-blog`, blogPost);
    console.log('✅ Blog post publicado:', response.data);
    return response.data.success;
  } catch (error) {
    console.error('❌ Erro ao publicar blog post:', error.message);
    return false;
  }
}

// Função para configurar agendamento automático
async function setupAutoScheduling() {
  try {
    console.log('⚙️ Configurando agendamento automático...');
    const response = await axios.post(`${API_BASE_URL}/setup-auto-scheduling`);
    console.log('✅ Agendamento configurado:', response.data);
    return response.data.success;
  } catch (error) {
    console.error('❌ Erro ao configurar agendamento:', error.message);
    return false;
  }
}

// Função para obter relatórios
async function getReports() {
  try {
    console.log('📊 Obtendo relatórios...');
    
    const startDate = '2024-01-01';
    const endDate = new Date().toISOString().split('T')[0];
    
    const response = await axios.get(`${API_BASE_URL}/reports/publications`, {
      params: {
        start_date: startDate,
        end_date: endDate,
        platform: 'facebook'
      }
    });
    
    console.log('✅ Relatórios:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao obter relatórios:', error.message);
    return null;
  }
}

// Função principal para executar todos os exemplos
async function runExamples() {
  console.log('🚀 Iniciando exemplos da integração Pabbly\n');
  
  // 1. Verificar status
  await checkStatus();
  console.log('');
  
  // 2. Testar conexão
  const isConnected = await testConnection();
  console.log('');
  
  if (!isConnected) {
    console.log('⚠️  Conexão não estabelecida. Verifique as configurações do Pabbly.');
    return;
  }
  
  // 3. Publicar conteúdo
  await publishContent();
  console.log('');
  
  // 4. Agendar publicação
  await schedulePost();
  console.log('');
  
  // 5. Publicar blog post
  await publishBlogPost();
  console.log('');
  
  // 6. Configurar agendamento automático
  await setupAutoScheduling();
  console.log('');
  
  // 7. Obter relatórios
  await getReports();
  console.log('');
  
  console.log('✅ Todos os exemplos executados com sucesso!');
}

// Executar exemplos se o script for chamado diretamente
if (require.main === module) {
  runExamples().catch(console.error);
}

module.exports = {
  testConnection,
  checkStatus,
  publishContent,
  schedulePost,
  publishBlogPost,
  setupAutoScheduling,
  getReports,
  runExamples
};
