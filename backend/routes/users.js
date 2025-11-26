const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Middleware para verificar se é admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado. Apenas administradores podem acessar esta funcionalidade.'
    });
  }
  next();
};

// Listar todos os usuários (apenas admin)
router.get('/', auth, requireAdmin, async (req, res) => {
  try {
    const [users] = await pool.execute(
      'SELECT id, name, email, role, is_active, created_at, updated_at FROM users ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Obter usuário por ID
router.get('/:id', auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const [users] = await pool.execute(
      'SELECT id, name, email, role, is_active, created_at, updated_at FROM users WHERE id = ?',
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      data: users[0]
    });
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Criar novo usuário (apenas admin)
router.post('/', [
  auth,
  requireAdmin,
  body('name').isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('role').isIn(['admin', 'editor']).withMessage('Role deve ser admin ou editor')
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

    const { name, email, password, role } = req.body;

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

    // Inserir usuário
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, 1, NOW(), NOW())',
      [name, email, hashedPassword, role]
    );

    // Buscar usuário criado (sem senha)
    const [newUser] = await pool.execute(
      'SELECT id, name, email, role, is_active, created_at, updated_at FROM users WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: newUser[0]
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Atualizar usuário
router.put('/:id', [
  auth,
  requireAdmin,
  body('name').optional().isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('role').optional().isIn(['admin', 'editor']).withMessage('Role deve ser admin ou editor'),
  body('is_active').optional().isBoolean().withMessage('is_active deve ser boolean')
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

    const { id } = req.params;
    const { name, email, role, is_active } = req.body;

    // Verificar se usuário existe
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE id = ?',
      [id]
    );

    if (existingUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Verificar se email já existe (se estiver sendo alterado)
    if (email) {
      const [emailCheck] = await pool.execute(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email, id]
      );

      if (emailCheck.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Email já está em uso'
        });
      }
    }

    // Construir query de atualização
    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (email) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (role) {
      updateFields.push('role = ?');
      updateValues.push(role);
    }
    if (is_active !== undefined) {
      updateFields.push('is_active = ?');
      updateValues.push(is_active);
    }

    updateFields.push('updated_at = NOW()');
    updateValues.push(id);

    // Atualizar usuário
    await pool.execute(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Buscar usuário atualizado
    const [updatedUser] = await pool.execute(
      'SELECT id, name, email, role, is_active, created_at, updated_at FROM users WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: updatedUser[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Alterar senha de usuário
router.put('/:id/password', [
  auth,
  requireAdmin,
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

    const { id } = req.params;
    const { newPassword } = req.body;

    // Verificar se usuário existe
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE id = ?',
      [id]
    );

    if (existingUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Criptografar nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Atualizar senha
    await pool.execute(
      'UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?',
      [hashedPassword, id]
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

// Deletar usuário (soft delete)
router.delete('/:id', auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se usuário existe
    const [existingUsers] = await pool.execute(
      'SELECT id, role FROM users WHERE id = ?',
      [id]
    );

    if (existingUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Não permitir deletar o próprio usuário
    if (parseInt(id) === req.user.userId) {
      return res.status(400).json({
        success: false,
        message: 'Você não pode deletar seu próprio usuário'
      });
    }

    // Soft delete (desativar usuário)
    await pool.execute(
      'UPDATE users SET is_active = 0, updated_at = NOW() WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Usuário desativado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Reativar usuário
router.put('/:id/activate', auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se usuário existe
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE id = ?',
      [id]
    );

    if (existingUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Reativar usuário
    await pool.execute(
      'UPDATE users SET is_active = 1, updated_at = NOW() WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Usuário reativado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao reativar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;

