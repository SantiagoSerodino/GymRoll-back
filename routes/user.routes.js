const express = require('express');
const { createUser, getAllUsers,editUser } = require('../controllers/user.controllers');

//Instanciando express
const route = express();

//Metodos HTTP
route.post('/register', createUser);
// obtencion  todos los usuarios (utiliza  validación de JWT)
route.get('/', getAllUsers);
route.patch ('/', editUser);


module.exports = route;