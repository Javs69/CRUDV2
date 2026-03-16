const db = require("../models/connection");

async function listar(req, res) {
    try {
        const result = await db.query(
            "SELECT id, nombre, fabricante, lanzamiento, generacion FROM plataformas ORDER BY id"
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function crear(req, res) {
    try {
        const { nombre, fabricante, lanzamiento, generacion } = req.body;

        if (!nombre || !fabricante || !lanzamiento || !generacion) {
            return res.status(400).json({
                error: "Debes enviar nombre, fabricante, lanzamiento y generacion"
            });
        }

        const result = await db.query(
            `INSERT INTO plataformas (nombre, fabricante, lanzamiento, generacion)
             VALUES ($1, $2, $3, $4)
             RETURNING id, nombre, fabricante, lanzamiento, generacion`,
            [nombre, fabricante, lanzamiento, generacion]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function actualizar(req, res) {
    try {
        const { nombre, fabricante, lanzamiento, generacion } = req.body;

        if (!nombre || !fabricante || !lanzamiento || !generacion) {
            return res.status(400).json({
                error: "Debes enviar todos los campos de la plataforma"
            });
        }

        const result = await db.query(
            `UPDATE plataformas
             SET nombre = $1, fabricante = $2, lanzamiento = $3, generacion = $4
             WHERE id = $5
             RETURNING id, nombre, fabricante, lanzamiento, generacion`,
            [nombre, fabricante, lanzamiento, generacion, req.params.id]
        );

        if (!result.rows[0]) {
            return res.status(404).json({ error: "Plataforma no encontrada" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function eliminar(req, res) {
    try {
        const result = await db.query(
            "DELETE FROM plataformas WHERE id = $1 RETURNING id",
            [req.params.id]
        );

        if (!result.rows[0]) {
            return res.status(404).json({ error: "Plataforma no encontrada" });
        }

        res.json({ mensaje: "Plataforma eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listar,
    crear,
    actualizar,
    eliminar
};
