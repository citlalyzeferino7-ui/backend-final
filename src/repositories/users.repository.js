const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../utils/db');

const router = express.Router();

router.post('/create', async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
    [email, password]
  );

  res.json(result.rows[0]);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  const user = result.rows[0];

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;