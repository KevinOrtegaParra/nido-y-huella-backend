const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    species: {
      type: String,
      required: true,
      enum: ['Conejo', 'Periquito australiano'],
      trim: true
    },

    sex: {
      type: String,
      required: true,
      enum: ['Macho', 'Hembra'],
      trim: true
    },

    birthDate: {
      type: Date,
      required: true
    },

    color: {
      type: String,
      required: true,
      trim: true
    },

    breed: {
      type: String,
      trim: true
    },

    mutation: {
      type: String,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      required: true,
      enum: ['Disponible', 'Reservado', 'Vendido'],
      default: 'Disponible'
    },

    images: {
      type: [String],
      default: []
    },

    description: {
      type: String,
      trim: true
    },

    observations: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;