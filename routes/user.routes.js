const express = require('express');
const { createUser, getAllUsers, editUser, loginUser, deleteUser } = require('../controllers/user.controllers');
const {jwtValidator} = require('../middleware/jwtValidation')
const {adminValidator} = require('../middleware/adminValidator')

//Instanciando express
const route = express();

//Metodos HTTP
route.post('/register', createUser);
route.post('/login', loginUser);
// obtencion  todos los usuarios (utiliza  validación de JWT y admin)
route.get('/', [jwtValidator, adminValidator], getAllUsers);
route.patch ('/', editUser);
route.delete('/',deleteUser);


module.exports = route;