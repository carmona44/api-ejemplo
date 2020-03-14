'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    () => { 
        console.log('Se ha conectado correctamente a la BBDD MongoDB.');
        app.listen(config.puerto, () => {
            console.log(`Servidor API activo en http://localhost:${config.puerto}`);
        });
     },
    err => {
        return console.log(`Se ha producido un error al conectar a la BBDD MongoDB: ${err}`);
    }
  );