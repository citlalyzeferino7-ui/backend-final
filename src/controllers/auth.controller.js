const pool = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user)
      return res.status(400).json({ message: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword)
      return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role });

  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};