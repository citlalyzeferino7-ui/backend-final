const pool = require("../utils/db");

async function buscar(search) {
  const query = `
    SELECT * FROM productos
    WHERE CAST(id AS TEXT) ILIKE $1
       OR nombre ILIKE $1
       OR CAST(precio AS TEXT) ILIKE $1
  `;
  const values = [`%${search}%`];
  const { rows } = await pool.query(query, values);
  return rows;
}

async function findVisible() {
  const { rows } = await pool.query("SELECT * FROM productos WHERE visible = true");
  return rows;
}

async function create({ nombre, precio, imagen }) {
  const { rows } = await pool.query(
    "INSERT INTO productos (nombre, precio, imagen) VALUES ($1, $2, $3) RETURNING *",
    [nombre, precio, imagen]
  );
  return rows[0];
}

module.exports = { buscar, findVisible, create };