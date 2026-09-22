const express = require('express');

const {
  obtenerAnimales,
  obtenerAnimalPorCodigo,
  crearAnimal,
  actualizarAnimal,
  cambiarEstadoAnimal,
  eliminarAnimal
} = require('../controllers/animalController.js');

const router = express.Router();

router.get('/', obtenerAnimales);

router.get('/:code', obtenerAnimalPorCodigo);

router.post('/', crearAnimal);

router.put('/:code', actualizarAnimal);

router.patch('/:code/status', cambiarEstadoAnimal);

router.delete('/:code', eliminarAnimal);

module.exports = router;