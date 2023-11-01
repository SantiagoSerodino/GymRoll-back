const express = require('express');
const { registerClass,editClass,getAllClasses,deleteClass } = require('../controllers/classes.controller')


const route = express();

route.post('/register', registerClass);
route.get('/', getAllClasses);
route.patch ('/edit', editClass);
route.delete ('/', deleteClass);


module.exports = route;