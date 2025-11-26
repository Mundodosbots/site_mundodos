const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth, requireRole } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Configurar multer para upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = process.env.UPLOAD_PATH || './uploads';
    
    // Criar diretório se não existir
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Gerar nome único para o arquivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// Filtro de arquivos
const fileFilter = (req, file, cb) => {
  // Permitir apenas imagens
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos de imagem são permitidos'), false);
  }
};

// Configurar upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB
  }
});

// Upload de imagem
router.post('/image', [
  auth,
  requireRole(['admin', 'editor']),
  upload.single('image')
], async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum arquivo foi enviado'
      });
    }

    const file = req.file;
    const userId = req.user.id;

    // Salvar informações do arquivo no banco
    const [result] = await pool.execute(
      'INSERT INTO uploaded_files (original_name, file_name, file_path, file_size, mime_type, uploaded_by) VALUES (?, ?, ?, ?, ?, ?)',
      [
        file.originalname,
        file.filename,
        file.path,
        file.size,
        file.mimetype,
        userId
      ]
    );

    // URL pública do arquivo
    const fileUrl = `/uploads/${file.filename}`;

    res.json({
      success: true,
      message: 'Arquivo enviado com sucesso',
      data: {
        id: result.insertId,
        originalName: file.originalname,
        fileName: file.filename,
        fileUrl: fileUrl,
        fileSize: file.size,
        mimeType: file.mimetype
      }
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    
    // Se houver erro, remover arquivo se foi criado
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Listar arquivos do usuário
router.get('/my-files', [
  auth,
  requireRole(['admin', 'editor'])
], async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    // Buscar arquivos do usuário
    const [files] = await pool.execute(
      `SELECT id, original_name, file_name, file_path, file_size, mime_type, created_at 
       FROM uploaded_files 
       WHERE uploaded_by = ? 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );

    // Contar total de arquivos
    const [countResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM uploaded_files WHERE uploaded_by = ?',
      [userId]
    );

    const totalFiles = countResult[0].total;
    const totalPages = Math.ceil(totalFiles / limit);

    // Adicionar URLs públicas
    const filesWithUrls = files.map(file => ({
      ...file,
      fileUrl: `/uploads/${file.file_name}`
    }));

    res.json({
      success: true,
      data: {
        files: filesWithUrls,
        pagination: {
          page,
          limit,
          total: totalFiles,
          totalPages
        }
      }
    });

  } catch (error) {
    console.error('Erro ao listar arquivos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Excluir arquivo
router.delete('/:id', [
  auth,
  requireRole(['admin', 'editor'])
], async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Buscar arquivo
    const [files] = await pool.execute(
      'SELECT * FROM uploaded_files WHERE id = ? AND uploaded_by = ?',
      [id, userId]
    );

    if (files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Arquivo não encontrado'
      });
    }

    const file = files[0];

    // Remover arquivo físico
    if (fs.existsSync(file.file_path)) {
      fs.unlinkSync(file.file_path);
    }

    // Remover registro do banco
    await pool.execute(
      'DELETE FROM uploaded_files WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Arquivo excluído com sucesso'
    });

  } catch (error) {
    console.error('Erro ao excluir arquivo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Middleware para servir arquivos estáticos
router.use('/uploads', express.static(process.env.UPLOAD_PATH || './uploads'));

module.exports = router;
