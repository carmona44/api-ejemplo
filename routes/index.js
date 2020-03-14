'use strict'

const express = require('express');
const paisController = require('../controllers/pais');
const superheroeController = require('../controllers/superheroe');
const api = express.Router();

api.get('/pais', paisController.getPaises);
api.get('/pais/:paisId', paisController.getPais);
api.post('/pais', paisController.savePais);
api.put('/pais/:paisId', paisController.updatePais);
api.delete('/pais/:paisId', paisController.deletePais);

api.get('/superheroe', superheroeController.getSuperheroes);
api.get('/superheroe/:superheroeId', superheroeController.getSuperheroe);
api.post('/superheroe', superheroeController.saveSuperheroe);
api.put('/superheroe/:superheroeId', superheroeController.updateSuperheroe);
api.delete('/superheroe/:superheroeId', superheroeController.deleteSuperheroe);

module.exports = api;