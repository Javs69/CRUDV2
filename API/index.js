const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./SRC/routes/authRoutes");
const plataformaRoutes = require("./SRC/routes/plataformaRoutes");
const videojuegoRoutes = require("./SRC/routes/videojuegoRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensaje: "API de biblioteca gamer funcionando",
        endpoints: [
            "/api/usuarios/login",
            "/api/plataformas",
            "/api/plataformas/:id",
            "/api/videojuegos",
            "/api/videojuegos/:id"
        ]
    });
});

app.use("/api/usuarios", authRoutes);
app.use("/api/plataformas", plataformaRoutes);
app.use("/api/videojuegos", videojuegoRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
