const express = require('express');
const { createUser, getAllUsers, editUser, loginUser, deleteUser } = require('../controllers/user.controllers');
const {errorMiddleware,jwtValidator,adminValidator} = require('../middleware/common.middleware');


//Instanciando express
const route = express();

//Metodos HTTP
route.post ('/register', createUser,errorMiddleware);
route.post ('/login', loginUser,errorMiddleware);
// obtencion  todos los usuarios (utiliza  validación de JWT)
route.get('/', adminValidator, getAllUsers,errorMiddleware);
route.patch ('/:id', editUser,errorMiddleware);
route.delete('/:id',deleteUser,errorMiddleware);

//Exportamos route
module.exports = route;