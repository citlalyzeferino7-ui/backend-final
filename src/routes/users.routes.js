const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');
const usersController = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');
const pool = require('../utils/db'); 

exports.createUser = async (req, res, next) => {
  const { email, password, name } = req.body; 
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Faltan campos requeridos (email, password, name)' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    const newUser = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
      [email, password, name]
    );

    res.status(201).json({
      message: 'Usuario creado con éxito',
      user: newUser.rows[0],
    });
  } catch (error) {
    next(error);
  }
};
router.post('/create', asyncHandler(usersController.createUser));

router.post('/login', asyncHandler(usersController.loginUser));

module.exports = router;