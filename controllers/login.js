'use estrict'

const jwt = require('jsonwebtoken');
const config = require('../config');

function getToken(req, res){
    var token = jwt.sign({}, config.secretToken, { expiresIn: '1h' });
    res.status(200).send({token});
}

module.exports = {
    getToken
}