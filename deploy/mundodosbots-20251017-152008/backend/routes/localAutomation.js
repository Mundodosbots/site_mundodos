const express = require('express');
const { body, validationResult } = require('express-validator');
const localAutomationService = require('../services/localAutomationService');

const router = express.Router();

// Middleware para validar erros
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array()
    });
  }
  next();
};

// =====================================================
// ROTAS DE CONFIGURAÇÃO
// =====================================================

// Inicializar serviço
router.post('/initialize', async (req, res) => {
  try {
    const result = await localAutomationService.initialize();
    res.json({
      success: result,
      message: result ? 'Serviço inicializado com sucesso' : 'Erro ao inicializar serviço'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao inicializar serviço',
      error: error.message
    });
  }
});

// Obter status do serviço
router.get('/status', async (req, res) => {
  try {
    const status = localAutomationService.getStatus();
    res.json({
      success: true,
      data: status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao obter status',
      error: error.message
    });
  }
});

// =====================================================
// ROTAS DE PUBLICAÇÃO
// =====================================================

// Publicar conteúdo imediatamente
router.post('/publish', [
  body('content').isObject().withMessage('Conteúdo deve ser um objeto'),
  body('image_url').optional().isURL().withMessage('URL da imagem inválida'),
  body('platforms').optional().isArray().withMessage('Plataformas deve ser um array'),
  body('tags').optional().isArray().withMessage('Tags deve ser um array'),
  body('campaign').optional().isString(),
  body('language').optional().isIn(['pt', 'en', 'es']).withMessage('Idioma inválido'),
  handleValidationErrors
], async (req, res) => {
  try {
    const result = await localAutomationService.publishNow(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao publicar conteúdo',
      error: error.message
    });
  }
});

// Agendar publicação
router.post('/schedule', [
  body('content').isObject().withMessage('Conteúdo deve ser um objeto'),
  body('scheduled_time').isISO8601().withMessage('Data/hora de agendamento inválida'),
  body('timezone').optional().isString(),
  body('image_url').optional().isURL().withMessage('URL da imagem inválida'),
  body('platforms').optional().isArray().withMessage('Plataformas deve ser um array'),
  body('tags').optional().isArray().withMessage('Tags deve ser um array'),
  body('campaign').optional().isString(),
  body('language').optional().isIn(['pt', 'en', 'es']).withMessage('Idioma inválido'),
  handleValidationErrors
], async (req, res) => {
  try {
    const result = await localAutomationService.schedulePost(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao agendar publicação',
      error: error.message
    });
  }
});

// Publicar blog post automaticamente
router.post('/publish-blog', [
  body('id').optional().isInt().withMessage('ID deve ser um número inteiro'),
  body('title').isString().withMessage('Título é obrigatório'),
  body('content').isString().withMessage('Conteúdo é obrigatório'),
  body('excerpt').optional().isString(),
  body('featured_image').optional().isURL().withMessage('URL da imagem inválida'),
  body('url').isURL().withMessage('URL do blog post é obrigatória'),
  body('tags').optional().isArray().withMessage('Tags deve ser um array'),
  body('language').optional().isIn(['pt', 'en', 'es']).withMessage('Idioma inválido'),
  handleValidationErrors
], async (req, res) => {
  try {
    const result = await localAutomationService.publishBlogPost(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao publicar blog post',
      error: error.message
    });
  }
});

// =====================================================
// ROTAS DE CONSULTA
// =====================================================

// Obter posts agendados
router.get('/scheduled', async (req, res) => {
  try {
    const posts = localAutomationService.getScheduledPosts();
    res.json({
      success: true,
      data: posts,
      count: posts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao obter posts agendados',
      error: error.message
    });
  }
});

// Obter histórico de publicações
router.get('/history', async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const posts = localAutomationService.getPublishedHistory();
    
    const paginatedPosts = posts
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
      .slice(parseInt(offset), parseInt(offset) + parseInt(limit));
    
    res.json({
      success: true,
      data: paginatedPosts,
      total: posts.length,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao obter histórico',
      error: error.message
    });
  }
});

// Obter estatísticas
router.get('/stats', async (req, res) => {
  try {
    const stats = localAutomationService.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao obter estatísticas',
      error: error.message
    });
  }
});

// =====================================================
// ROTAS DE GERENCIAMENTO
// =====================================================

// Cancelar post agendado
router.delete('/scheduled/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const posts = localAutomationService.getScheduledPosts();
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }
    
    posts.splice(postIndex, 1);
    await localAutomationService.saveScheduledPosts();
    
    res.json({
      success: true,
      message: 'Post cancelado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao cancelar post',
      error: error.message
    });
  }
});

// Reprogramar post
router.put('/scheduled/:postId', [
  body('scheduled_time').isISO8601().withMessage('Data/hora de agendamento inválida'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { postId } = req.params;
    const { scheduled_time } = req.body;
    const posts = localAutomationService.getScheduledPosts();
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }
    
    post.scheduled_time = scheduled_time;
    post.updated_at = new Date().toISOString();
    
    await localAutomationService.saveScheduledPosts();
    
    res.json({
      success: true,
      message: 'Post reprogramado com sucesso',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao reprogramar post',
      error: error.message
    });
  }
});

module.exports = router;
