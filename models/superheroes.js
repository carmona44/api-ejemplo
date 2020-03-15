'use strict'

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Pais = mongoose.model('Pais');

const superheroeSchema = new Schema({
  nombre: { type: String },
  pais:  { type: Schema.ObjectId, ref: "Pais", required: true }
});

module.exports = mongoose.model('Superheroe', superheroeSchema);