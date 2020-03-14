'use strict'

const express = require('express');
const paisController = require('../controllers/pais');
const api = express.Router();

api.get('/pais', paisController.getPaises);
api.get('/pais/:paisId', paisController.getPais);
api.post('/pais', paisController.savePais);
api.put('/pais/:paisId', paisController.updatePais);
api.delete('/pais/:paisId', paisController.deletePais);

module.exports = api;