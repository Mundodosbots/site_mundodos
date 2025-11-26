const axios = require('axios');
const cron = require('node-cron');

class PabblyService {
  constructor() {
    this.baseURL = process.env.PABBLY_BASE_URL || 'https://api.pabbly.com/v1';
    this.apiKey = process.env.PABBLY_API_KEY;
    this.webhookURL = process.env.PABBLY_WEBHOOK_URL;
    this.isInitialized = false;
  }

  // Inicializar o serviço
  async initialize() {
    if (!this.apiKey) {
      console.error('❌ Pabbly API Key não configurada');
      return false;
    }

    try {
      // Testar conexão com Pabbly
      const response = await this.testConnection();
      if (response.success) {
        this.isInitialized = true;
        console.log('✅ Pabbly Service inicializado com sucesso');
        return true;
      }
    } catch (error) {
      console.error('❌ Erro ao inicializar Pabbly Service:', error.message);
    }
    return false;
  }

  // Testar conexão com Pabbly
  async testConnection() {
    try {
      const response = await axios.get(`${this.baseURL}/webhooks`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        message: 'Conexão com Pabbly estabelecida',
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao conectar com Pabbly',
        error: error.message
      };
    }
  }

  // Criar webhook para receber dados do Pabbly
  async createWebhook(webhookData) {
    try {
      const response = await axios.post(`${this.baseURL}/webhooks`, {
        name: webhookData.name || 'Mundo dos Bots Social Media',
        url: webhookData.url || this.webhookURL,
        events: webhookData.events || ['workflow.completed'],
        headers: webhookData.headers || {},
        is_active: true
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        message: 'Webhook criado com sucesso',
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao criar webhook',
        error: error.message
      };
    }
  }

  // Enviar dados para workflow do Pabbly
  async triggerWorkflow(workflowId, data) {
    try {
      const response = await axios.post(`${this.baseURL}/workflows/${workflowId}/trigger`, {
        data: data,
        trigger_type: 'manual'
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        message: 'Workflow acionado com sucesso',
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao acionar workflow',
        error: error.message
      };
    }
  }

  // Publicar conteúdo nas redes sociais
  async publishToSocialMedia(postData) {
    try {
      const socialMediaData = {
        content: postData.content,
        image_url: postData.image_url,
        platforms: postData.platforms || ['facebook', 'instagram', 'linkedin'],
        scheduled_time: postData.scheduled_time,
        tags: postData.tags || [],
        metadata: {
          source: 'Mundo dos Bots',
          campaign: postData.campaign || 'default',
          language: postData.language || 'pt'
        }
      };

      // Enviar para workflow do Pabbly
      const workflowId = process.env.PABBLY_SOCIAL_MEDIA_WORKFLOW_ID;
      if (!workflowId) {
        throw new Error('Workflow ID não configurado');
      }

      const result = await this.triggerWorkflow(workflowId, socialMediaData);
      
      if (result.success) {
        console.log('✅ Conteúdo enviado para publicação nas redes sociais');
        return {
          success: true,
          message: 'Conteúdo enviado para publicação',
          workflow_id: workflowId,
          data: result.data
        };
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('❌ Erro ao publicar nas redes sociais:', error.message);
      return {
        success: false,
        message: 'Erro ao publicar nas redes sociais',
        error: error.message
      };
    }
  }

  // Agendar publicação
  async schedulePost(postData) {
    try {
      const scheduledData = {
        ...postData,
        scheduled_time: postData.scheduled_time,
        timezone: postData.timezone || 'America/Sao_Paulo'
      };

      const result = await this.publishToSocialMedia(scheduledData);
      
      if (result.success) {
        console.log(`✅ Publicação agendada para ${postData.scheduled_time}`);
        return {
          success: true,
          message: 'Publicação agendada com sucesso',
          scheduled_time: postData.scheduled_time,
          data: result.data
        };
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao agendar publicação',
        error: error.message
      };
    }
  }

  // Publicar blog post automaticamente
  async publishBlogPost(blogPost) {
    try {
      const socialMediaContent = {
        content: this.generateSocialMediaContent(blogPost),
        image_url: blogPost.featured_image || blogPost.image_url,
        platforms: ['facebook', 'instagram', 'linkedin'],
        tags: blogPost.tags || [],
        campaign: 'blog_automation',
        language: blogPost.language || 'pt',
        metadata: {
          blog_post_id: blogPost.id,
          title: blogPost.title,
          excerpt: blogPost.excerpt,
          url: blogPost.url
        }
      };

      const result = await this.publishToSocialMedia(socialMediaContent);
      
      if (result.success) {
        console.log(`✅ Blog post "${blogPost.title}" publicado nas redes sociais`);
        return {
          success: true,
          message: 'Blog post publicado nas redes sociais',
          blog_post_id: blogPost.id,
          data: result.data
        };
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao publicar blog post',
        error: error.message
      };
    }
  }

  // Gerar conteúdo otimizado para redes sociais
  generateSocialMediaContent(blogPost) {
    const title = blogPost.title;
    const excerpt = blogPost.excerpt || blogPost.content.substring(0, 150);
    const url = blogPost.url;
    
    // Templates para diferentes plataformas
    const templates = {
      facebook: `📱 ${title}\n\n${excerpt}...\n\n🔗 Leia mais: ${url}\n\n#MundoDosBots #Chatbots #Automação`,
      instagram: `🤖 ${title}\n\n${excerpt}...\n\n📖 Link na bio\n\n#MundoDosBots #Chatbots #Automação #IA`,
      linkedin: `💼 ${title}\n\n${excerpt}...\n\n🔗 Confira o artigo completo: ${url}\n\n#MundoDosBots #Chatbots #Automação #Inovação #Tecnologia`
    };

    return templates;
  }

  // Processar webhook recebido do Pabbly
  async processWebhook(webhookData) {
    try {
      console.log('📥 Webhook recebido do Pabbly:', webhookData);

      // Processar diferentes tipos de eventos
      switch (webhookData.event_type) {
        case 'workflow.completed':
          return await this.handleWorkflowCompleted(webhookData);
        case 'social_media.published':
          return await this.handleSocialMediaPublished(webhookData);
        case 'social_media.failed':
          return await this.handleSocialMediaFailed(webhookData);
        default:
          console.log('📋 Evento não processado:', webhookData.event_type);
          return { success: true, message: 'Evento recebido' };
      }
    } catch (error) {
      console.error('❌ Erro ao processar webhook:', error.message);
      return {
        success: false,
        message: 'Erro ao processar webhook',
        error: error.message
      };
    }
  }

  // Handler para workflow completado
  async handleWorkflowCompleted(webhookData) {
    console.log('✅ Workflow completado:', webhookData.workflow_id);
    // Aqui você pode adicionar lógica adicional
    // como notificações, logs, etc.
    return {
      success: true,
      message: 'Workflow processado com sucesso',
      workflow_id: webhookData.workflow_id
    };
  }

  // Handler para publicação bem-sucedida
  async handleSocialMediaPublished(webhookData) {
    console.log('✅ Publicação realizada:', webhookData.platform);
    // Log da publicação bem-sucedida
    return {
      success: true,
      message: 'Publicação realizada com sucesso',
      platform: webhookData.platform,
      post_id: webhookData.post_id
    };
  }

  // Handler para publicação falhada
  async handleSocialMediaFailed(webhookData) {
    console.error('❌ Falha na publicação:', webhookData.error);
    // Aqui você pode implementar retry logic
    return {
      success: false,
      message: 'Falha na publicação',
      error: webhookData.error,
      platform: webhookData.platform
    };
  }

  // Configurar agendamento automático
  setupAutoScheduling() {
    // Agendar publicação automática às 9h da manhã
    cron.schedule('0 9 * * *', async () => {
      console.log('🕘 Executando agendamento automático...');
      // Aqui você pode implementar lógica para buscar posts pendentes
      // e agendar automaticamente
    }, {
      timezone: 'America/Sao_Paulo'
    });

    console.log('✅ Agendamento automático configurado');
  }

  // Obter status do serviço
  getStatus() {
    return {
      initialized: this.isInitialized,
      api_key_configured: !!this.apiKey,
      webhook_url: this.webhookURL,
      base_url: this.baseURL
    };
  }
}

module.exports = new PabblyService();
