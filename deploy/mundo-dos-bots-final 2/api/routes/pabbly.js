const express = require('express');
const { body, validationResult } = require('express-validator');
const pabblyService = require('../services/pabblyService');

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

// Testar conexão com Pabbly
router.get('/test-connection', async (req, res) => {
  try {
    const result = await pabblyService.testConnection();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao testar conexão',
      error: error.message
    });
  }
});

// Obter status do serviço
router.get('/status', async (req, res) => {
  try {
    const status = pabblyService.getStatus();
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

// Inicializar serviço
router.post('/initialize', async (req, res) => {
  try {
    const result = await pabblyService.initialize();
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

// =====================================================
// ROTAS DE WEBHOOK
// =====================================================

// Criar webhook
router.post('/webhooks', [
  body('name').optional().isString(),
  body('url').isURL().withMessage('URL inválida'),
  body('events').optional().isArray(),
  handleValidationErrors
], async (req, res) => {
  try {
    const result = await pabblyService.createWebhook(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar webhook',
      error: error.message
    });
  }
});

// Receber webhook do Pabbly
router.post('/webhook', async (req, res) => {
  try {
    const result = await pabblyService.processWebhook(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao processar webhook',
      error: error.message
    });
  }
});

// =====================================================
// ROTAS DE PUBLICAÇÃO
// =====================================================

// Publicar conteúdo nas redes sociais
router.post('/publish', [
  body('content').isObject().withMessage('Conteúdo deve ser um objeto'),
  body('image_url').optional().isURL().withMessage('URL da imagem inválida'),
  body('platforms').optional().isArray().withMessage('Plataformas deve ser um array'),
  body('scheduled_time').optional().isISO8601().withMessage('Data/hora inválida'),
  body('tags').optional().isArray().withMessage('Tags deve ser um array'),
  body('campaign').optional().isString(),
  body('language').optional().isIn(['pt', 'en', 'es']).withMessage('Idioma inválido'),
  handleValidationErrors
], async (req, res) => {
  try {
    const result = await pabblyService.publishToSocialMedia(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao publicar nas redes sociais',
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
    const result = await pabblyService.schedulePost(req.body);
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
  body('id').isInt().withMessage('ID do blog post é obrigatório'),
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
    const result = await pabblyService.publishBlogPost(req.body);
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
// ROTAS DE WORKFLOW
// =====================================================

// Acionar workflow
router.post('/workflows/:workflowId/trigger', [
  body('data').isObject().withMessage('Dados são obrigatórios'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { workflowId } = req.params;
    const result = await pabblyService.triggerWorkflow(workflowId, req.body.data);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao acionar workflow',
      error: error.message
    });
  }
});

// =====================================================
// ROTAS DE CONFIGURAÇÃO AUTOMÁTICA
// =====================================================

// Configurar agendamento automático
router.post('/setup-auto-scheduling', async (req, res) => {
  try {
    pabblyService.setupAutoScheduling();
    res.json({
      success: true,
      message: 'Agendamento automático configurado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao configurar agendamento automático',
      error: error.message
    });
  }
});

// =====================================================
// ROTAS DE RELATÓRIOS
// =====================================================

// Obter relatório de publicações
router.get('/reports/publications', async (req, res) => {
  try {
    const { start_date, end_date, platform, campaign } = req.query;
    
    // Aqui você pode implementar lógica para buscar relatórios
    // do banco de dados ou do Pabbly
    
    res.json({
      success: true,
      data: {
        total_publications: 0,
        successful: 0,
        failed: 0,
        platforms: {},
        campaigns: {}
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao gerar relatório',
      error: error.message
    });
  }
});

module.exports = router;
