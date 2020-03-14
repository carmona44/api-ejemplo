'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paisSchema = new Schema({
    nombre: String,
    latitud: Number,
    longitud: Number
});

module.exports = mongoose.model("Pais", paisSchema);