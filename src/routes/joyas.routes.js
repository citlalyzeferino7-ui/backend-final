const express = require('express');
const router = express.Router();
const pool = require('../utils/db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM joyas');
        res.json(result.rows); // devolver todas las joyas
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

router.post('/', (req, res) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ error: 'No se proporcionó el token de autorización' });
    }

    const token = header && header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ error: 'Token inválido o ausente' });
    }
    pool.query(
        'INSERT INTO joyas (name, price, description) VALUES ($1, $2, $3)',
        [req.body.name, req.body.price, req.body.description],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error al insertar la joya' });
            }
            res.status(201).json({ message: 'Joya creada con éxito' });
        }
    );
});

router.put('/:id', (req, res) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ error: 'No se proporcionó el token de autorización' });
    }

    const token = header && header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ error: 'Token inválido o ausente' });
    }

    const { id } = req.params;
    const { name, price, description } = req.body;

    pool.query(
        'UPDATE joyas SET name = $1, price = $2, description = $3 WHERE id = $4',
        [name, price, description, id],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error al actualizar la joya' });
            }
            res.json({ message: 'Joya actualizada con éxito' });
        }
    );
});

router.delete('/:id', (req, res) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ error: 'No se proporcionó el token de autorización' });
    }

    const token = header && header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ error: 'Token inválido o ausente' });
    }

    const { id } = req.params;

    pool.query(
        'DELETE FROM joyas WHERE id = $1',
        [id],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error al eliminar la joya' });
            }
            res.json({ message: 'Joya eliminada con éxito' });
        }
    );
});

module.exports = router;