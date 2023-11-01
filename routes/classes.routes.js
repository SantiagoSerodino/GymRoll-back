const express = require('express');
const { registerClass,getAllClasses } = require('../controllers/classes.controller')


const route = express();

route.post('/register', registerClass);
route.get('/', getAllClasses);


module.exports = route;