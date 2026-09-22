const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const animalRoutes = require('./routes/animalRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API Nido & Huella funcionando'
  });
});

app.use('/api/animals', animalRoutes);

module.exports = app;