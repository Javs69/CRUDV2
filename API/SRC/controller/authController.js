const db = require("../models/connection");

async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Debes enviar username y password" });
        }

        const result = await db.query(
            "SELECT id, username, nombre_mostrado, password FROM usuarios WHERE username = $1",
            [username]
        );

        const user = result.rows[0];

        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        res.json({
            mensaje: "Login correcto",
            token: `gamer-${user.id}-${Date.now()}`,
            user: {
                id: user.id,
                username: user.username,
                nombre: user.nombre_mostrado
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    login
};
