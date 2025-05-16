require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// Importar rutas
const heroesRoutes = require('./routes/heroe');
const multimediaRoutes = require('./routes/multimedia');

// Configuración de Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api/heroes', heroesRoutes);
app.use('/api/multimedia', multimediaRoutes);

// Manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});