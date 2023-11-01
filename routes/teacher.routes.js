const express = require('express');
const { registerTeacher, getAllTeachers,editTeacher,deleteTeacher,addClasstoTeacher } = require('../controllers/teacher.controller')


const route = express();

route.post('/register', registerTeacher);
route.post('/',addClasstoTeacher)
route.get('/', getAllTeachers);
route.patch('/edit', editTeacher);
route.delete ('/delete', deleteTeacher);

module.exports = route;