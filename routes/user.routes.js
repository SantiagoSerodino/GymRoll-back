const express = require('express');
const {createUser, getAllUsers} = require('../controllers/user.controllers');

//Instanciando express
const route = express();

//Metodos HTTP
route.post('/register', createUser);
route.get('/', jwtValidator, getAllUsers);


module.exports = route;