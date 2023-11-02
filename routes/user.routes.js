const express = require('express');
const {createUser, getAllUsers} = require('../controllers/user.controllers');

//Instanciando express
const route = express();

//Metodos HTTP
route.post('/register', createUser);
// obtencion  todos los usuarios (utiliza  validación de JWT)
route.get('/', jwtValidator, getAllUsers);


module.exports = route;