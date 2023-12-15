const express = require('express');
const { registerTeacher, getAllTeachers,editTeacher,deleteTeacher,addClasstoTeacher } = require('../controllers/teacher.controller')

//Instanciando express
const route = express();

//Metodos HTTP
route.post('/register', registerTeacher);
route.post('/:id',addClasstoTeacher)
route.get('/', getAllTeachers);
route.patch('/edit/:id', editTeacher);
route.delete ('/delete/:id', deleteTeacher);

//Exportamos route
module.exports = route;