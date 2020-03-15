'use strict'

const Superheroe = require('../models/superheroes');
const Pais = require('../models/paises');
const paginasPredef = {
    pagina: 0,
    limite: 5
};

function getSuperheroes(req, res){
    const paginacion = {
        pagina: req.query.page || paginasPredef.pagina,
        limite: req.query.limit || paginasPredef.limite
    };

    Superheroe.find()
                .skip(paginacion.pagina * paginacion.limite)
                .limit(paginacion.limite)
                .exec((err, superheroes) => {
                    if(err){
                        res.status(500).send({message: `Error al obtener los superheroes: ${err}`});
                    } else if (!superheroes) {
                        res.status(404).send({message: 'No hay superheroes'});
                    } else {
                        Pais.populate(superheroes, {path: "pais"}, (err, superheroes) => {
                            res.status(200).send({ superheroes });
                        })
                    }
                });
}

function getSuperheroe(req, res){
    let superheroeId = req.params.superheroeId;
    Superheroe.findById(superheroeId, (err, superheroe) => {
        if(err){
            res.status(500).send({message: `Error al obtener el superheroe: ${err}`});
        } else if (!superheroe) {
            res.status(404).send({message: 'El superheroe no existe'});
        } else {
            res.status(200).send({ superheroe });
        }
    });
}

function updateSuperheroe(req, res){
    let superheroeId = req.params.superheroeId;
    let update = req.body;

    Superheroe.findByIdAndUpdate(superheroeId, update, (err, superheroe) => {
        if(err){
            res.status(500).send({message: `Error al obtener el superheroe: ${err}`});
        } else {
            res.status(200).send({ superheroe });
        }
    });
}

function deleteSuperheroe(req, res){
    let superheroeId = req.params.superheroeId;
    Superheroe.findById(superheroeId, (err, superheroe) => {
        if(err){
            res.status(500).send({message: `Error al obtener el superheroe: ${err}`});
        } else {
            superheroe.remove(err => {
                if(err) res.status(500).send({message: `Error al borrar el superheroe: ${err}`});

                res.status(200).send({ message: 'El superheroe se ha eliminado.' });
            });
        }
    });
}

function saveSuperheroe(req, res){
    console.log('POST /api/superheroe');
    console.log(req.body);

    let superheroe = new Superheroe();
    superheroe.nombre = req.body.nombre;
    superheroe.pais = req.body.pais;

    superheroe.save((err, superheroeEnv) => {
        if(err){
            res.status(500).send({message: `Error al mandar el superheroe: ${err}`});
        } else {
            res.status(200).send({message: 'Superheroe enviado correctamente.', superheroe: superheroeEnv});
        }
    });
}

module.exports = {
    getSuperheroes,
    getSuperheroe,
    updateSuperheroe,
    deleteSuperheroe,
    saveSuperheroe
}