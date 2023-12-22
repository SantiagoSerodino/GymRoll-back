const express = require('express');
const { registerTeacher, getAllTeachers,editTeacher,deleteTeacher,addClasstoTeacher } = require('../controllers/teacher.controller');
const { superAdminValidator, errorMiddleware } = require('../middleware/common.middleware');

//Instanciando express
const route = express();

//Metodos HTTP
route.post('/register', registerTeacher,errorMiddleware);
route.get('/',superAdminValidator,getAllTeachers,errorMiddleware);
route.patch('/edit/:id', editTeacher,errorMiddleware);
route.delete ('/delete/:id', deleteTeacher,errorMiddleware);

//Exportamos route
module.exports = route;