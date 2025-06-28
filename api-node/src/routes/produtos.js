const express = require('express');
const router = express.Router();
const pool = require('../config/db');



// GET /produtos
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT id, nome, preco, estoque, descricao, status, data_alteracao FROM produto WHERE status != 'excluido'");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /produtos/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT id, nome, preco, estoque, descricao, status, data_alteracao FROM produto WHERE id = $1 AND status != 'excluido'", [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /produtos
router.post('/', async (req, res) => {
  try {
    const { nome, preco, estoque, descricao, status } = req.body;

    if (!nome || preco == null || estoque == null) {
      return res.status(400).json({ error: 'Campos obrigatórios: nome, preco, estoque' });
    }

    const { rows } = await pool.query(
      `INSERT INTO produto (nome, preco, estoque, descricao, status) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nome, preco, estoque, descricao, status?.trim() || 'ativo']
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// PUT /produtos/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, estoque, descricao, status } = req.body;

    if (!nome || preco == null || estoque == null) {
      return res.status(400).json({ error: 'Campos obrigatórios: nome, preco, estoque' });
    }

    const { rows } = await pool.query(
      `UPDATE produto 
       SET nome=$1, preco=$2, estoque=$3, descricao=$4, status=$5, data_alteracao=NOW() 
       WHERE id=$6 RETURNING *`,
      [nome, preco, estoque, descricao, status?.trim() || 'ativo', id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// PUT /produtos/:id/ativar
router.put('/:id/ativar', async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(
      `UPDATE produto SET status='ativo', data_alteracao=NOW() WHERE id=$1 AND status='excluido'`,
      [id]
    );routes
    if (rowCount === 0) return res.status(404).json({ message: 'Produto não encontrado ou já ativo' });
    res.json({ message: 'Produto reativado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE /produtos/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(
      `UPDATE produto SET status='excluido', data_alteracao=NOW() WHERE id=$1`,
      [id]
    );
    if (rowCount === 0) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto marcado como excluído' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
