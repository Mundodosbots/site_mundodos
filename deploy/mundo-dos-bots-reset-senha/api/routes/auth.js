const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Buscar usuário
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ? AND is_active = 1',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha incorretos'
      });
    }

    const user = users[0];

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha incorretos'
      });
    }

    // Gerar token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Remover senha da resposta
    delete user.password;

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        user,
        token
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Verificar token
router.get('/verify', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Token válido',
      data: {
        user: req.user
      }
    });
  } catch (error) {
    console.error('Erro na verificação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Logout (opcional - o frontend pode apenas remover o token)
router.post('/logout', auth, async (req, res) => {
  try {
    // Em uma implementação mais robusta, você poderia adicionar o token a uma blacklist
    res.json({
      success: true,
      message: 'Logout realizado com sucesso'
    });
  } catch (error) {
    console.error('Erro no logout:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Alterar senha
router.put('/change-password', [
  auth,
  body('currentPassword').isLength({ min: 6 }).withMessage('Senha atual deve ter pelo menos 6 caracteres'),
  body('newPassword').isLength({ min: 6 }).withMessage('Nova senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Buscar usuário atual
    const [users] = await pool.execute(
      'SELECT password FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, users[0].password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Senha atual incorreta'
      });
    }

    // Criptografar nova senha
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Atualizar senha
    await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedNewPassword, userId]
    );

    res.json({
      success: true,
      message: 'Senha alterada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Registro público de usuários
router.post('/register', [
  body('name').isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    // Verificar se email já existe
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email já está em uso'
      });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Inserir usuário (role padrão: editor)
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role, is_active, created_at, updated_at) VALUES (?, ?, ?, "editor", 1, NOW(), NOW())',
      [name, email, hashedPassword]
    );

    // Buscar usuário criado (sem senha)
    const [newUser] = await pool.execute(
      'SELECT id, name, email, role, is_active, created_at FROM users WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: newUser[0]
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Solicitar reset de senha
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Email inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Email inválido',
        errors: errors.array()
      });
    }

    const { email } = req.body;

    // Buscar usuário
    const [users] = await pool.execute(
      'SELECT id, email, name FROM users WHERE email = ? AND is_active = 1',
      [email]
    );

    // Sempre retorna sucesso, mesmo se o email não existir (segurança)
    if (users.length === 0) {
      return res.json({
        success: true,
        message: 'Se o email existir, você receberá um link para resetar sua senha'
      });
    }

    const user = users[0];

    // Gerar token único
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hora

    // Salvar token no banco
    await pool.execute(
      'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user.id, resetToken, expiresAt]
    );

    // Em produção, envie o token por email
    // Por enquanto, retornamos o token na resposta (apenas para desenvolvimento)
    res.json({
      success: true,
      message: 'Se o email existir, você receberá um link para resetar sua senha',
      data: {
        resetToken // REMOVER EM PRODUÇÃO
      }
    });

  } catch (error) {
    console.error('Erro ao solicitar reset de senha:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Validar token de reset
router.get('/validate-reset-token/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Buscar token válido
    const [tokens] = await pool.execute(
      `SELECT t.id, t.user_id, t.expires_at, u.email, u.name 
       FROM password_reset_tokens t
       JOIN users u ON t.user_id = u.id
       WHERE t.token = ? AND t.used = 0 AND t.expires_at > NOW()`,
      [token]
    );

    if (tokens.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Token inválido ou expirado'
      });
    }

    res.json({
      success: true,
      message: 'Token válido',
      data: {
        email: tokens[0].email
      }
    });

  } catch (error) {
    console.error('Erro ao validar token:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Resetar senha
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Token é obrigatório'),
  body('newPassword').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errors.array()
      });
    }

    const { token, newPassword } = req.body;

    // Buscar token válido
    const [tokens] = await pool.execute(
      `SELECT t.id, t.user_id 
       FROM password_reset_tokens t
       WHERE t.token = ? AND t.used = 0 AND t.expires_at > NOW()`,
      [token]
    );

    if (tokens.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Token inválido ou expirado'
      });
    }

    const resetTokenData = tokens[0];

    // Criptografar nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Atualizar senha do usuário
    await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, resetTokenData.user_id]
    );

    // Marcar token como usado
    await pool.execute(
      'UPDATE password_reset_tokens SET used = 1 WHERE id = ?',
      [resetTokenData.id]
    );

    res.json({
      success: true,
      message: 'Senha resetada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao resetar senha:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
