const { pool } = require('../utils/db');

class UsersRepository {

  // Buscar un usuario por su correo electrónico
  async findByEmail(email) {
    const result = await pool.query(
      'SELECT id, email, password_hash, role FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  // Crear un nuevo usuario
  async create({ email, passwordHash, role = 'user' }) {
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role',
      [email, passwordHash, role]
    );
    return result.rows[0];
  }

  // Obtener un usuario por su ID
  async findById(id) {
    const result = await pool.query(
      'SELECT id, email, role FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }
}

module.exports = { UsersRepository };