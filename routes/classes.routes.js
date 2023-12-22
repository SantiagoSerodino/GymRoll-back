const express = require('express');
const { registerClass,editClass,getAllClasses,deleteClass } = require('../controllers/classes.controller');
const { jwtValidator, errorMiddleware } = require('../middleware/common.middleware');


//Instanciando express
const route = express();

//Metodos HTTP
route.post('/register', registerClass,errorMiddleware);
route.get('/' ,getAllClasses,errorMiddleware);
route.patch ('/edit/:id', editClass,errorMiddleware);
route.delete ('/:id', deleteClass,errorMiddleware);

//Exportamos route
module.exports = route;