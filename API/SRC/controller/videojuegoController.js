const db = require("../models/connection");

async function listar(req, res) {
    try {
        const result = await db.query(
            `SELECT v.id, v.titulo, v.genero, v.estudio, v.precio, v.plataforma_id, p.nombre AS plataforma_nombre
             FROM videojuegos v
             JOIN plataformas p ON p.id = v.plataforma_id
             ORDER BY v.id`
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function crear(req, res) {
    try {
        const { titulo, genero, estudio, precio, plataforma_id } = req.body;

        if (!titulo || !genero || !estudio || !precio || !plataforma_id) {
            return res.status(400).json({
                error: "Debes enviar titulo, genero, estudio, precio y plataforma_id"
            });
        }

        const result = await db.query(
            `INSERT INTO videojuegos (titulo, genero, estudio, precio, plataforma_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, titulo, genero, estudio, precio, plataforma_id`,
            [titulo, genero, estudio, precio, plataforma_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function actualizar(req, res) {
    try {
        const { titulo, genero, estudio, precio, plataforma_id } = req.body;

        if (!titulo || !genero || !estudio || !precio || !plataforma_id) {
            return res.status(400).json({
                error: "Debes enviar todos los campos del videojuego"
            });
        }

        const result = await db.query(
            `UPDATE videojuegos
             SET titulo = $1, genero = $2, estudio = $3, precio = $4, plataforma_id = $5
             WHERE id = $6
             RETURNING id, titulo, genero, estudio, precio, plataforma_id`,
            [titulo, genero, estudio, precio, plataforma_id, req.params.id]
        );

        if (!result.rows[0]) {
            return res.status(404).json({ error: "Videojuego no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function eliminar(req, res) {
    try {
        const result = await db.query(
            "DELETE FROM videojuegos WHERE id = $1 RETURNING id",
            [req.params.id]
        );

        if (!result.rows[0]) {
            return res.status(404).json({ error: "Videojuego no encontrado" });
        }

        res.json({ mensaje: "Videojuego eliminado" });
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
