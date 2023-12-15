const express = require('express');
const { registerClass,editClass,getAllClasses,deleteClass } = require('../controllers/classes.controller')

//Instanciando express
const route = express();

//Metodos HTTP
route.post('/register', registerClass);
route.get('/', getAllClasses);
route.patch ('/edit/:id', editClass);
route.delete ('/:id', deleteClass);

//Exportamos route
module.exports = route;