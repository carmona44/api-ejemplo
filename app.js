'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes');
const jwt = require('jsonwebtoken');
const config = require('./config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    if(req.originalUrl === '/api/login'){
        next();
    } else {
        jwt.verify(req.headers['authorization'], config.secretToken, function(err, decoded) {
            if(err){
                res.status(401).send({message: 'Error al autenticar con jwt'});
            } else {
                next();
            }
        });
    }
});
app.use('/api', api);

module.exports = app;