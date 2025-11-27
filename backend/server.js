const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { testConnection } = require('./config/database');

// Importar rotas
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const uploadRoutes = require('./routes/upload');
const solutionsRoutes = require('./routes/solutions');
const pabblyRoutes = require('./routes/pabbly');
const localAutomationRoutes = require('./routes/localAutomation');
const settingsRoutes = require('./routes/settings');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// =====================================================
// MIDDLEWARES DE SEGURANÇA E PERFORMANCE
// =====================================================

// Helmet para segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      connectSrc: ["'self'", "https://mundodosbots.com.br", "https://www.mundodosbots.com.br"]
    }
  }
}));

// CORS - Configuração segura por ambiente
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://mundodosbots.com.br', 'https://www.mundodosbots.com.br']
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 minutos
  max: process.env.RATE_LIMIT_MAX || 100, // limite por IP
  message: {
    success: false,
    message: 'Muitas requisições deste IP, tente novamente mais tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Compressão
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// =====================================================
// MIDDLEWARES DE PARSING
// =====================================================

// Parse JSON
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =====================================================
// ROTAS
// =====================================================

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API Mundo dos Bots funcionando!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/solutions', solutionsRoutes);
app.use('/api/pabbly', pabblyRoutes);
app.use('/api/local-automation', localAutomationRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/users', usersRoutes);

// =====================================================
// MIDDLEWARE DE ERRO
// =====================================================

// 404 - Rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.path
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro:', error);

  // Erro de upload do multer
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'Arquivo muito grande. Tamanho máximo: 5MB'
    });
  }

  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      message: 'Campo de arquivo inesperado'
    });
  }

  // Erro de validação
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: error.errors
    });
  }

  // Erro genérico
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno do servidor'
  });
});

// =====================================================
// INICIAR SERVIDOR
// =====================================================

const startServer = async () => {
  try {
    // Testar conexão com banco
    await testConnection();

    // Iniciar servidor - escutar em 0.0.0.0 para aceitar conexões externas
    app.listen(PORT, '0.0.0.0', () => {
      console.log('🚀 Servidor iniciado com sucesso!');
      console.log(`📍 Porta: ${PORT}`);
      console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 URL: http://0.0.0.0:${PORT}`);
      console.log(`📊 Health Check: http://0.0.0.0:${PORT}/health`);
      console.log(`🤖 Pabbly Integration: http://0.0.0.0:${PORT}/api/pabbly`);
      console.log('='.repeat(50));
    });

  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM recebido, encerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT recebido, encerrando servidor...');
  process.exit(0);
});

startServer();
