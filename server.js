require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const heroesRoutes = require('./routes/heroe');
const multimediaRoutes = require('./routes/multimedia');
const authRoutes = require('./routes/auth');

// Configuración de Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/heroes', heroesRoutes);
app.use('/api/multimedia', multimediaRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});