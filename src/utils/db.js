// src/utils/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'http://localhost:3000',
  user: process.env.DB_USER || 'citlalyzeferino7-ui',
  password: process.env.DB_PASSWORD || 'Citlaly_joyeria',
  database: process.env.DB_NAME || 'joyeria',
  port: process.env.DB_PORT || 5432,
});

pool.on('connect', () => {
  console.log('Conectado a la base de datos');
});

pool.on('error', (err) => {
  console.error('Error en la base de datos', err);
});

module.exports = pool;