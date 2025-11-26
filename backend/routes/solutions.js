const express = require('express');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Listar todas as soluções por objetivo (público)
router.get('/objective', async (req, res) => {
  try {
    const [solutions] = await pool.execute(
      'SELECT * FROM solutions_by_objective WHERE is_active = 1 ORDER BY order_position ASC'
    );
    res.json({ success: true, data: solutions });
  } catch (error) {
    console.error('Erro ao listar soluções por objetivo:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// Listar todas as soluções por setor (público)
router.get('/sector', async (req, res) => {
  try {
    const [solutions] = await pool.execute(
      'SELECT * FROM solutions_by_sector WHERE is_active = 1 ORDER BY order_position ASC'
    );
    res.json({ success: true, data: solutions });
  } catch (error) {
    console.error('Erro ao listar soluções por setor:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// Listar todas as soluções por produto (público)
router.get('/product', async (req, res) => {
  try {
    const [solutions] = await pool.execute(
      'SELECT * FROM solutions_by_product WHERE is_active = 1 ORDER BY order_position ASC'
    );
    res.json({ success: true, data: solutions });
  } catch (error) {
    console.error('Erro ao listar soluções por produto:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// Buscar solução por objetivo por slug
router.get('/objective/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [solutions] = await pool.execute(
      'SELECT * FROM solutions_by_objective WHERE slug = ? AND is_active = 1',
      [slug]
    );
    if (solutions.length === 0) {
      return res.status(404).json({ success: false, message: 'Solução não encontrada' });
    }
    res.json({ success: true, data: solutions[0] });
  } catch (error) {
    console.error('Erro ao buscar solução por objetivo:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// Buscar solução por setor por slug
router.get('/sector/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [solutions] = await pool.execute(
      'SELECT * FROM solutions_by_sector WHERE slug = ? AND is_active = 1',
      [slug]
    );
    if (solutions.length === 0) {
      return res.status(404).json({ success: false, message: 'Solução não encontrada' });
    }
    res.json({ success: true, data: solutions[0] });
  } catch (error) {
    console.error('Erro ao buscar solução por setor:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// Buscar solução por produto por slug
router.get('/product/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [solutions] = await pool.execute(
      'SELECT * FROM solutions_by_product WHERE slug = ? AND is_active = 1',
      [slug]
    );
    if (solutions.length === 0) {
      return res.status(404).json({ success: false, message: 'Solução não encontrada' });
    }
    res.json({ success: true, data: solutions[0] });
  } catch (error) {
    console.error('Erro ao buscar solução por produto:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

module.exports = router;
