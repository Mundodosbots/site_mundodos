const cron = require('node-cron');
const fs = require('fs').promises;
const path = require('path');

class LocalAutomationService {
  constructor() {
    this.scheduledPosts = [];
    this.publishedPosts = [];
    this.dataFile = path.join(__dirname, '../data/scheduled_posts.json');
    this.historyFile = path.join(__dirname, '../data/published_history.json');
    this.isInitialized = false;
  }

  // Inicializar o serviço
  async initialize() {
    try {
      // Criar diretório de dados se não existir
      const dataDir = path.dirname(this.dataFile);
      await fs.mkdir(dataDir, { recursive: true });

      // Carregar posts agendados
      await this.loadScheduledPosts();
      
      // Carregar histórico
      await this.loadPublishedHistory();
      
      // Configurar agendamento automático
      this.setupAutoScheduling();
      
      this.isInitialized = true;
      console.log('✅ Local Automation Service inicializado com sucesso');
      return true;
    } catch (error) {
      console.error('❌ Erro ao inicializar Local Automation Service:', error.message);
      return false;
    }
  }

  // Carregar posts agendados
  async loadScheduledPosts() {
    try {
      const data = await fs.readFile(this.dataFile, 'utf8');
      this.scheduledPosts = JSON.parse(data);
    } catch (error) {
      this.scheduledPosts = [];
      await this.saveScheduledPosts();
    }
  }

  // Salvar posts agendados
  async saveScheduledPosts() {
    try {
      await fs.writeFile(this.dataFile, JSON.stringify(this.scheduledPosts, null, 2));
    } catch (error) {
      console.error('❌ Erro ao salvar posts agendados:', error.message);
    }
  }

  // Carregar histórico de publicações
  async loadPublishedHistory() {
    try {
      const data = await fs.readFile(this.historyFile, 'utf8');
      this.publishedPosts = JSON.parse(data);
    } catch (error) {
      this.publishedPosts = [];
      await this.savePublishedHistory();
    }
  }

  // Salvar histórico de publicações
  async savePublishedHistory() {
    try {
      await fs.writeFile(this.historyFile, JSON.stringify(this.publishedPosts, null, 2));
    } catch (error) {
      console.error('❌ Erro ao salvar histórico:', error.message);
    }
  }

  // Agendar publicação
  async schedulePost(postData) {
    try {
      const post = {
        id: Date.now().toString(),
        ...postData,
        status: 'scheduled',
        created_at: new Date().toISOString(),
        scheduled_time: postData.scheduled_time,
        platforms: postData.platforms || ['facebook', 'instagram', 'linkedin']
      };

      this.scheduledPosts.push(post);
      await this.saveScheduledPosts();

      console.log(`✅ Post agendado para ${postData.scheduled_time}`);
      return {
        success: true,
        message: 'Post agendado com sucesso',
        post_id: post.id,
        scheduled_time: postData.scheduled_time
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao agendar post',
        error: error.message
      };
    }
  }

  // Publicar conteúdo imediatamente
  async publishNow(postData) {
    try {
      const post = {
        id: Date.now().toString(),
        ...postData,
        status: 'published',
        published_at: new Date().toISOString(),
        platforms: postData.platforms || ['facebook', 'instagram', 'linkedin']
      };

      // Simular publicação em cada plataforma
      const results = await this.simulatePublishing(post);

      // Adicionar ao histórico
      this.publishedPosts.push({
        ...post,
        results
      });
      await this.savePublishedHistory();

      console.log(`✅ Post publicado em ${post.platforms.length} plataformas`);
      return {
        success: true,
        message: 'Post publicado com sucesso',
        post_id: post.id,
        results
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao publicar post',
        error: error.message
      };
    }
  }

  // Simular publicação nas redes sociais
  async simulatePublishing(post) {
    const results = {};
    
    for (const platform of post.platforms) {
      try {
        // Simular delay de publicação
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        results[platform] = {
          success: true,
          post_id: `${platform}_${Date.now()}`,
          message: `Post publicado com sucesso no ${platform}`,
          published_at: new Date().toISOString()
        };
      } catch (error) {
        results[platform] = {
          success: false,
          error: error.message
        };
      }
    }

    return results;
  }

  // Configurar agendamento automático
  setupAutoScheduling() {
    // Verificar posts agendados a cada minuto
    cron.schedule('* * * * *', async () => {
      await this.checkScheduledPosts();
    }, {
      timezone: 'America/Sao_Paulo'
    });

    console.log('✅ Agendamento automático configurado');
  }

  // Verificar posts agendados
  async checkScheduledPosts() {
    const now = new Date();
    const postsToPublish = [];

    for (let i = this.scheduledPosts.length - 1; i >= 0; i--) {
      const post = this.scheduledPosts[i];
      const scheduledTime = new Date(post.scheduled_time);

      if (scheduledTime <= now) {
        postsToPublish.push(post);
        this.scheduledPosts.splice(i, 1);
      }
    }

    // Publicar posts agendados
    for (const post of postsToPublish) {
      await this.publishScheduledPost(post);
    }

    if (postsToPublish.length > 0) {
      await this.saveScheduledPosts();
    }
  }

  // Publicar post agendado
  async publishScheduledPost(post) {
    try {
      console.log(`🕘 Publicando post agendado: ${post.id}`);
      
      const results = await this.simulatePublishing(post);
      
      // Adicionar ao histórico
      this.publishedPosts.push({
        ...post,
        status: 'published',
        published_at: new Date().toISOString(),
        results
      });
      
      await this.savePublishedHistory();
      
      console.log(`✅ Post agendado publicado: ${post.id}`);
    } catch (error) {
      console.error(`❌ Erro ao publicar post agendado: ${post.id}`, error.message);
    }
  }

  // Publicar blog post automaticamente
  async publishBlogPost(blogPost) {
    try {
      // Auto-incrementar ID se não fornecido
      if (!blogPost.id) {
        const lastPost = this.publishedPosts.length > 0 
          ? Math.max(...this.publishedPosts.map(p => parseInt(p.metadata?.blog_post_id) || 0))
          : 0;
        blogPost.id = lastPost + 1;
      }

      const socialMediaContent = this.generateSocialMediaContent(blogPost);
      
      const postData = {
        content: socialMediaContent,
        image_url: blogPost.featured_image,
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

      const result = await this.publishNow(postData);
      
      if (result.success) {
        console.log(`✅ Blog post "${blogPost.title}" (ID: ${blogPost.id}) publicado automaticamente`);
      }
      
      return {
        ...result,
        blog_post_id: blogPost.id
      };
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
    
    return {
      facebook: `📱 ${title}\n\n${excerpt}...\n\n🔗 Leia mais: ${url}\n\n#MundoDosBots #Chatbots #Automação`,
      instagram: `🤖 ${title}\n\n${excerpt}...\n\n📖 Link na bio\n\n#MundoDosBots #Chatbots #Automação #IA`,
      linkedin: `💼 ${title}\n\n${excerpt}...\n\n🔗 Confira o artigo completo: ${url}\n\n#MundoDosBots #Chatbots #Automação #Inovação #Tecnologia`
    };
  }

  // Obter posts agendados
  getScheduledPosts() {
    return this.scheduledPosts;
  }

  // Obter histórico de publicações
  getPublishedHistory() {
    return this.publishedPosts;
  }

  // Obter estatísticas
  getStats() {
    const totalScheduled = this.scheduledPosts.length;
    const totalPublished = this.publishedPosts.length;
    const successfulPublishes = this.publishedPosts.filter(p => p.status === 'published').length;

    return {
      total_scheduled: totalScheduled,
      total_published: totalPublished,
      successful_publishes: successfulPublishes,
      success_rate: totalPublished > 0 ? (successfulPublishes / totalPublished * 100).toFixed(2) : 0
    };
  }

  // Obter status do serviço
  getStatus() {
    return {
      initialized: this.isInitialized,
      auto_scheduling: true,
      data_file: this.dataFile,
      history_file: this.historyFile
    };
  }
}

module.exports = new LocalAutomationService();
