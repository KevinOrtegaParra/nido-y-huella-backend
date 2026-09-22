const Animal = require('../models/Animal');
const {
  calcularEdad,
  formatearFechaNacimiento
} = require('../services/ageService');

const obtenerAnimales = async (req, res) => {
  try {

    const { species, sex, status } = req.query;

    const filtros = {};

    if (species) {
      filtros.species = species;
    }

    if (sex) {
      filtros.sex = sex;
    }

    if (status) {
      filtros.status = status;
    }

    const animales = await Animal.find(filtros);

    const animalesConEdad = animales.map((animal) => ({
      ...animal.toObject(),
      age: calcularEdad(animal.birthDate),
      birthDateFormatted: formatearFechaNacimiento(animal.birthDate)
    }));

    res.status(200).json(animalesConEdad);

  } catch (error) {

    res.status(500).json({
      message: 'Error al obtener los animales',
      error: error.message
    });

  }
};


const obtenerAnimalPorCodigo = async (req, res) => {
  try {

    const animal = await Animal.findOne({
      code: req.params.code
    });

    if (!animal) {
      return res.status(404).json({
        message: 'Animal no encontrado'
      });
    }

    const animalConEdad = {
      ...animal.toObject(),
      age: calcularEdad(animal.birthDate),
      birthDateFormatted: formatearFechaNacimiento(animal.birthDate)
    };

    res.status(200).json(animalConEdad);

  } catch (error) {

    res.status(500).json({
      message: 'Error al obtener el animal',
      error: error.message
    });

  }
};


const crearAnimal = async (req, res) => {
  try {

    const animal = new Animal(req.body);

    const animalGuardado = await animal.save();

    res.status(201).json(animalGuardado);

  } catch (error) {

    res.status(400).json({
      message: 'Error al crear el animal',
      error: error.message
    });

  }
};


const actualizarAnimal = async (req, res) => {
  try {

    const animalActualizado = await Animal.findOneAndUpdate(
      { code: req.params.code },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!animalActualizado) {
      return res.status(404).json({
        message: 'Animal no encontrado'
      });
    }

    res.status(200).json(animalActualizado);

  } catch (error) {

    res.status(400).json({
      message: 'Error al actualizar el animal',
      error: error.message
    });

  }
};


const cambiarEstadoAnimal = async (req, res) => {
  try {

    const { status } = req.body;

    const estadosPermitidos = [
      'Disponible',
      'Reservado',
      'Vendido'
    ];

    if (!estadosPermitidos.includes(status)) {
      return res.status(400).json({
        message: 'Estado no válido'
      });
    }

    const animalActualizado = await Animal.findOneAndUpdate(
      { code: req.params.code },
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!animalActualizado) {
      return res.status(404).json({
        message: 'Animal no encontrado'
      });
    }

    res.status(200).json(animalActualizado);

  } catch (error) {

    res.status(400).json({
      message: 'Error al cambiar el estado del animal',
      error: error.message
    });

  }
};


const eliminarAnimal = async (req, res) => {
  try {

    const animalEliminado = await Animal.findOneAndDelete({
      code: req.params.code
    });

    if (!animalEliminado) {
      return res.status(404).json({
        message: 'Animal no encontrado'
      });
    }

    res.status(200).json({
      message: 'Animal eliminado correctamente',
      animal: animalEliminado
    });

  } catch (error) {

    res.status(500).json({
      message: 'Error al eliminar el animal',
      error: error.message
    });

  }
};


module.exports = {
  obtenerAnimales,
  obtenerAnimalPorCodigo,
  crearAnimal,
  actualizarAnimal,
  cambiarEstadoAnimal,
  eliminarAnimal
};