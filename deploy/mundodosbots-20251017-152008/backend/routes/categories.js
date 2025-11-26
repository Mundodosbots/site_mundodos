const express = require('express');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Listar todas as categorias (público)
router.get('/', async (req, res) => {
  try {
    const [categories] = await pool.execute(
      'SELECT * FROM categories WHERE is_active = 1 ORDER BY name ASC'
    );

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Listar todas as categorias (admin)
router.get('/admin', auth, requireRole(['admin', 'editor']), async (req, res) => {
  try {
    const [categories] = await pool.execute(
      'SELECT * FROM categories ORDER BY name ASC'
    );

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Buscar categoria por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [categories] = await pool.execute(
      'SELECT * FROM categories WHERE id = ? AND is_active = 1',
      [id]
    );

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Categoria não encontrada'
      });
    }

    res.json({
      success: true,
      data: categories[0]
    });
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Criar nova categoria
router.post('/', [
  auth,
  requireRole(['admin', 'editor']),
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2 e 100 caracteres'),
  body('slug').trim().isLength({ min: 2, max: 100 }).withMessage('Slug deve ter entre 2 e 100 caracteres'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Descrição deve ter no máximo 500 caracteres')
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

    const { name, slug, description } = req.body;

    // Verificar se o slug já existe
    const [existingCategories] = await pool.execute(
      'SELECT id FROM categories WHERE slug = ?',
      [slug]
    );

    if (existingCategories.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Slug já existe'
      });
    }

    // Inserir nova categoria
    const [result] = await pool.execute(
      'INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)',
      [name, slug, description]
    );

    // Buscar categoria criada
    const [newCategories] = await pool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Categoria criada com sucesso',
      data: newCategories[0]
    });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Atualizar categoria
router.put('/:id', [
  auth,
  requireRole(['admin', 'editor']),
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2 e 100 caracteres'),
  body('slug').trim().isLength({ min: 2, max: 100 }).withMessage('Slug deve ter entre 2 e 100 caracteres'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Descrição deve ter no máximo 500 caracteres')
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
    const { name, slug, description } = req.body;

    // Verificar se a categoria existe
    const [existingCategories] = await pool.execute(
      'SELECT id FROM categories WHERE id = ?',
      [id]
    );

    if (existingCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Categoria não encontrada'
      });
    }

    // Verificar se o slug já existe (exceto para a categoria atual)
    const [duplicateSlugs] = await pool.execute(
      'SELECT id FROM categories WHERE slug = ? AND id != ?',
      [slug, id]
    );

    if (duplicateSlugs.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Slug já existe'
      });
    }

    // Atualizar categoria
    await pool.execute(
      'UPDATE categories SET name = ?, slug = ?, description = ? WHERE id = ?',
      [name, slug, description, id]
    );

    // Buscar categoria atualizada
    const [updatedCategories] = await pool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Categoria atualizada com sucesso',
      data: updatedCategories[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Excluir categoria
router.delete('/:id', [
  auth,
  requireRole(['admin'])
], async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se a categoria existe
    const [existingCategories] = await pool.execute(
      'SELECT id FROM categories WHERE id = ?',
      [id]
    );

    if (existingCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Categoria não encontrada'
      });
    }

    // Verificar se há posts usando esta categoria
    const [postsUsingCategory] = await pool.execute(
      'SELECT COUNT(*) as count FROM blog_posts WHERE category_id = ?',
      [id]
    );

    if (postsUsingCategory[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: 'Não é possível excluir uma categoria que possui posts associados'
      });
    }

    // Excluir categoria (soft delete)
    await pool.execute(
      'UPDATE categories SET is_active = 0 WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Categoria excluída com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
