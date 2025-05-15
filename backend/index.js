// server.js

// Importa las librerías necesarias
const express = require('express');
const cors = require('cors');

// Crea la aplicación Express
const app = express();

// Configura CORS para aceptar solicitudes desde http://localhost:5173
app.use(
    cors({
        origin: 'http://localhost:5173', // permite solo ese origen
        methods: ['GET', 'POST', 'OPTIONS'], // métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // cabeceras permitidas
    })
);

// Middleware para parsear JSON
app.use(express.json());

// Ruta POST para /api/chat
app.post('/api/chat', (req, res) => {
    const data = req.body; // Aquí recibes los datos enviados por el cliente
    console.log('Datos recibidos:', data);

    // Aquí puedes procesar la solicitud y responder
    res.json({ message: 'Respuesta del servidor', dataRecibida: data });
});

// Responder a solicitudes OPTIONS (preflight)
app.options('/api/chat', (req, res) => {
    res.sendStatus(204); // No Content
});

// Iniciar el servidor en el puerto 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});