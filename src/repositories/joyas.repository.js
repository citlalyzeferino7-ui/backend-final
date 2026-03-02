const db = require('../utils/db');

exports.getAll = async () => {
  const { rows } = await db.query('SELECT * FROM joyas');
  return rows;
};

exports.getById = async (id) => {
  const { rows } = await db.query('SELECT * FROM joyas WHERE id = $1', [id]);
  return rows[0];
};

exports.create = async (data) => {
  const { nombre, precio, descripcion, stock, imagen } = data;
  const { rows } = await db.query(
    'INSERT INTO joyas (nombre, precio, descripcion, stock, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nombre, precio, descripcion, stock, imagen]
  );
  return rows[0];
};

exports.update = async (id, data) => {
  const { nombre, precio, descripcion, stock, imagen } = data;
  const { rows } = await db.query(
    'UPDATE joyas SET nombre = $1, precio = $2, descripcion = $3, stock = $4, imagen = $5 WHERE id = $6 RETURNING *',
    [nombre, precio, descripcion, stock, imagen, id]
  );
  return rows[0];
};

exports.delete = async (id) => {
  const { rows } = await db.query('DELETE FROM joyas WHERE id = $1 RETURNING *', [id]);
  return rows[0];
};