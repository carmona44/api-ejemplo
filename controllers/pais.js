'use strict'

const Pais = require('../models/paises');
const Superheroe = require('../models/superheroes');

function getPaises(req, res){
    Pais.find({}, (err, paises) => {
        if(err){
            res.status(500).send({message: `Error al obtener los paises: ${err}`});
        } else if (!paises) {
            res.status(404).send({message: 'No hay paises'});
        } else {
            res.status(200).send({ paises });
        }
    });
}

function getPais(req, res){
    let paisId = req.params.paisId;
    Pais.findById(paisId, (err, pais) => {
        if(err){
            res.status(500).send({message: `Error al obtener el pais: ${err}`});
        } else if (!pais) {
            res.status(404).send({message: 'El pais no existe'});
        } else {
            res.status(200).send({ pais });
        }
    });
}

function updatePais(req, res){
    let paisId = req.params.paisId;
    let update = req.body;

    Pais.findByIdAndUpdate(paisId, update, (err, pais) => {
        if(err){
            res.status(500).send({message: `Error al obtener el pais: ${err}`});
        } else {
            res.status(200).send({ pais });
        }
    });
}

function deletePais(req, res){
    let paisId = req.params.paisId;
    Pais.findById(paisId, (err, pais) => {
        if(err){
            res.status(500).send({message: `Error al obtener el pais: ${err}`});
        } else {
            pais.remove(err => {
                if(err) res.status(500).send({message: `Error al borrar el pais: ${err}`});

                res.status(200).send({ message: 'El pais se ha eliminado.' });
            });
        }
    });
}

function savePais(req, res){
    console.log('POST /api/pais');
    console.log(req.body);

    let pais = new Pais();
    pais.nombre = req.body.nombre;
    pais.latitud = req.body.latitud;
    pais.longitud = req.body.longitud;

    pais.save((err, paisEnv) => {
        if(err){
            res.status(500).send({message: `Error al mandar el pais: ${err}`});
        } else {
            res.status(200).send({message: 'Pais enviado correctamente.', pais: paisEnv});
        }
    });
}

function getSuperHPais(req, res){
    let paisId = req.params.paisId;
    Pais.findById(paisId, (err, p) => {
        if(err){
            res.status(500).send({message: `Error al obtener el pais: ${err}`});
        } else if (!p) {
            res.status(404).send({message: 'El pais no existe'});
        } else {
            Superheroe.find({pais: paisId}, (err, superheroes) => {
                if(err){
                    res.status(500).send({message: `Error al obtener los superheroes: ${err}`});
                } else if (!superheroes) {
                    res.status(404).send({message: `No hay superheroes para el pais ${p.nombre}`});
                } else {
                    res.status(200).send({ pais: p, superheroes: superheroes });
                }
            });
        }
    });
}

module.exports = {
    getPaises,
    getPais,
    updatePais,
    deletePais,
    savePais,
    getSuperHPais
}