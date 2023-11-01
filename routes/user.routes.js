const express = require('express');
const {getAllUsers} = require('../controllers/user.controllers');

//Instanciando express
const route = express();

//Metodos HTTP
route.get('/', getAllUsers);


module.exports = route;