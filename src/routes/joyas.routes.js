const express = require('express');
const pool = require('../utils/db');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM joyas');
  res.json(result.rows);
});

router.post('/', auth, async (req, res) => {
  const { nombre, precio, descripcion, stock, imagen } = req.body;

  const result = await pool.query(
    'INSERT INTO joyas (nombre, precio, descripcion, stock, imagen) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [nombre, precio, descripcion, stock, imagen]
  );

  res.status(201).json(result.rows[0]);
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion, stock, imagen } = req.body;

  const result = await pool.query(
    'UPDATE joyas SET nombre=$1, precio=$2, descripcion=$3, stock=$4, imagen=$5 WHERE id=$6 RETURNING *',
    [nombre, precio, descripcion, stock, imagen, id]
  );

  res.json(result.rows[0]);
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  await pool.query('DELETE FROM joyas WHERE id=$1', [id]);

  res.json({ message: 'Joya eliminada' });
});

module.exports = router;