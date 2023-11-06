const express = require('express');
const {createUser, getAllUsers, loginUser} = require('../controllers/user.controllers');

//Instanciando express
const route = express();

//Metodos HTTP
route.post('/register', createUser);
route.post('login', loginUser);
// obtencion  todos los usuarios (utiliza  validación de JWT)
route.get('/', jwtValidator, getAllUsers);


module.exports = route;