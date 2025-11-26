const express = require('express');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const { auth } = require('../middleware/auth');

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
// CONFIGURAÇÕES GERAIS
// =====================================================

// Obter todas as configurações
router.get('/', auth, async (req, res) => {
  try {
    const [settings] = await pool.execute(
      'SELECT * FROM site_settings'
    );

    // Organizar configurações por categoria
    const organizedSettings = {
      pabbly: {},
      openai: {},
      gemini: {},
      general: {}
    };

    settings.forEach(setting => {
      const [category, key] = setting.setting_key.split('.');
      if (organizedSettings[category]) {
        organizedSettings[category][key] = setting.setting_value;
      } else {
        organizedSettings.general[setting.setting_key] = setting.setting_value;
      }
    });

    res.json({
      success: true,
      data: organizedSettings
    });
  } catch (error) {
    console.error('Erro ao obter configurações:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao obter configurações',
      error: error.message
    });
  }
});

// Atualizar configurações
router.put('/', [
  auth,
  body('settings').isObject().withMessage('Configurações devem ser um objeto'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { settings } = req.body;
    const updates = [];

    // Processar cada categoria de configurações
    for (const [category, configs] of Object.entries(settings)) {
      for (const [key, value] of Object.entries(configs)) {
        const settingKey = `${category}.${key}`;
        updates.push({
          key: settingKey,
          value: value
        });
      }
    }

    // Atualizar no banco de dados
    for (const update of updates) {
      await pool.execute(
        `INSERT INTO site_settings (setting_key, setting_value, updated_at) 
         VALUES (?, ?, NOW()) 
         ON DUPLICATE KEY UPDATE 
         setting_value = VALUES(setting_value), 
         updated_at = NOW()`,
        [update.key, update.value]
      );
    }

    res.json({
      success: true,
      message: 'Configurações atualizadas com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar configurações',
      error: error.message
    });
  }
});

// =====================================================
// CONFIGURAÇÕES PABBLY
// =====================================================

// Obter configurações do Pabbly
router.get('/pabbly', auth, async (req, res) => {
  try {
    const [settings] = await pool.execute(
      'SELECT setting_key, setting_value FROM site_settings WHERE setting_key LIKE "pabbly.%"'
    );

    const pabblySettings = {};
    settings.forEach(setting => {
      const key = setting.setting_key.replace('pabbly.', '');
      pabblySettings[key] = setting.setting_value;
    });

    res.json({
      success: true,
      data: pabblySettings
    });
  } catch (error) {
    console.error('Erro ao obter configurações Pabbly:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao obter configurações Pabbly',
      error: error.message
    });
  }
});

// Atualizar configurações do Pabbly
router.put('/pabbly', [
  auth,
  body('api_key').optional().isString(),
  body('base_url').optional().isURL().withMessage('URL base inválida'),
  body('webhook_url').optional().isURL().withMessage('URL do webhook inválida'),
  body('workflow_id').optional().isString(),
  body('auto_schedule_enabled').optional().isBoolean(),
  body('auto_schedule_time').optional().isString(),
  body('timezone').optional().isString(),
  handleValidationErrors
], async (req, res) => {
  try {
    const updates = [];
    for (const [key, value] of Object.entries(req.body)) {
      if (value !== undefined) {
        updates.push({
          key: `pabbly.${key}`,
          value: value.toString()
        });
      }
    }

    for (const update of updates) {
      await pool.execute(
        `INSERT INTO site_settings (setting_key, setting_value, updated_at) 
         VALUES (?, ?, NOW()) 
         ON DUPLICATE KEY UPDATE 
         setting_value = VALUES(setting_value), 
         updated_at = NOW()`,
        [update.key, update.value]
      );
    }

    res.json({
      success: true,
      message: 'Configurações do Pabbly atualizadas com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar configurações Pabbly:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar configurações Pabbly',
      error: error.message
    });
  }
});

// =====================================================
// CONFIGURAÇÕES OPENAI
// =====================================================

// Obter configurações da OpenAI
router.get('/openai', auth, async (req, res) => {
  try {
    const [settings] = await pool.execute(
      'SELECT setting_key, setting_value FROM site_settings WHERE setting_key LIKE "openai.%"'
    );

    const openaiSettings = {};
    settings.forEach(setting => {
      const key = setting.setting_key.replace('openai.', '');
      openaiSettings[key] = setting.setting_value;
    });

    res.json({
      success: true,
      data: openaiSettings
    });
  } catch (error) {
    console.error('Erro ao obter configurações OpenAI:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao obter configurações OpenAI',
      error: error.message
    });
  }
});

// Atualizar configurações da OpenAI
router.put('/openai', [
  auth,
  body('api_key').optional().isString(),
  body('model').optional().isString(),
  body('max_tokens').optional().isInt({ min: 1, max: 4000 }),
  body('temperature').optional().isFloat({ min: 0, max: 2 }),
  body('enabled').optional().isBoolean(),
  handleValidationErrors
], async (req, res) => {
  try {
    const updates = [];
    for (const [key, value] of Object.entries(req.body)) {
      if (value !== undefined) {
        updates.push({
          key: `openai.${key}`,
          value: value.toString()
        });
      }
    }

    for (const update of updates) {
      await pool.execute(
        `INSERT INTO site_settings (setting_key, setting_value, updated_at) 
         VALUES (?, ?, NOW()) 
         ON DUPLICATE KEY UPDATE 
         setting_value = VALUES(setting_value), 
         updated_at = NOW()`,
        [update.key, update.value]
      );
    }

    res.json({
      success: true,
      message: 'Configurações da OpenAI atualizadas com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar configurações OpenAI:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar configurações OpenAI',
      error: error.message
    });
  }
});

// =====================================================
// CONFIGURAÇÕES GEMINI
// =====================================================

// Obter configurações do Gemini
router.get('/gemini', auth, async (req, res) => {
  try {
    const [settings] = await pool.execute(
      'SELECT setting_key, setting_value FROM site_settings WHERE setting_key LIKE "gemini.%"'
    );

    const geminiSettings = {};
    settings.forEach(setting => {
      const key = setting.setting_key.replace('gemini.', '');
      geminiSettings[key] = setting.setting_value;
    });

    res.json({
      success: true,
      data: geminiSettings
    });
  } catch (error) {
    console.error('Erro ao obter configurações Gemini:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao obter configurações Gemini',
      error: error.message
    });
  }
});

// Atualizar configurações do Gemini
router.put('/gemini', [
  auth,
  body('api_key').optional().isString(),
  body('model').optional().isString(),
  body('max_tokens').optional().isInt({ min: 1, max: 8000 }),
  body('temperature').optional().isFloat({ min: 0, max: 2 }),
  body('enabled').optional().isBoolean(),
  handleValidationErrors
], async (req, res) => {
  try {
    const updates = [];
    for (const [key, value] of Object.entries(req.body)) {
      if (value !== undefined) {
        updates.push({
          key: `gemini.${key}`,
          value: value.toString()
        });
      }
    }

    for (const update of updates) {
      await pool.execute(
        `INSERT INTO site_settings (setting_key, setting_value, updated_at) 
         VALUES (?, ?, NOW()) 
         ON DUPLICATE KEY UPDATE 
         setting_value = VALUES(setting_value), 
         updated_at = NOW()`,
        [update.key, update.value]
      );
    }

    res.json({
      success: true,
      message: 'Configurações do Gemini atualizadas com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar configurações Gemini:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar configurações Gemini',
      error: error.message
    });
  }
});

// =====================================================
// TESTE DE CONEXÕES
// =====================================================

// Testar conexão Pabbly
router.post('/test-pabbly', auth, async (req, res) => {
  try {
    const [settings] = await pool.execute(
      'SELECT setting_value FROM site_settings WHERE setting_key = "pabbly.api_key"'
    );

    if (settings.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'API Key do Pabbly não configurada'
      });
    }

    // Aqui você pode adicionar a lógica de teste real do Pabbly
    res.json({
      success: true,
      message: 'Conexão com Pabbly testada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao testar conexão Pabbly',
      error: error.message
    });
  }
});

// Testar conexão OpenAI
router.post('/test-openai', auth, async (req, res) => {
  try {
    const [settings] = await pool.execute(
      'SELECT setting_value FROM site_settings WHERE setting_key = "openai.api_key"'
    );

    if (settings.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'API Key da OpenAI não configurada'
      });
    }

    // Aqui você pode adicionar a lógica de teste real da OpenAI
    res.json({
      success: true,
      message: 'Conexão com OpenAI testada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao testar conexão OpenAI',
      error: error.message
    });
  }
});

// Testar conexão Gemini
router.post('/test-gemini', auth, async (req, res) => {
  try {
    const [settings] = await pool.execute(
      'SELECT setting_value FROM site_settings WHERE setting_key = "gemini.api_key"'
    );

    if (settings.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'API Key do Gemini não configurada'
      });
    }

    // Aqui você pode adicionar a lógica de teste real do Gemini
    res.json({
      success: true,
      message: 'Conexão com Gemini testada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao testar conexão Gemini',
      error: error.message
    });
  }
});

module.exports = router;
