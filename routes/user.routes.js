const express = require('express');
const { createUser, getAllUsers, editUser, loginUser, deleteUser } = require('../controllers/user.controllers');
const jwtValidation = requiere('../middleware/jwtValidation')

//Instanciando express
const route = express();

//Metodos HTTP
route.post('/register', createUser);
route.post('/login', loginUser);
// obtencion  todos los usuarios (utiliza  validación de JWT)
route.get('/', jwtValidation, getAllUsers);
route.patch ('/', editUser);
route.delete('/',deleteUser);


module.exports = route;