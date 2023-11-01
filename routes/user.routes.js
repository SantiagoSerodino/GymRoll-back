const express = require('express');
const {getAllUsers} = require('../controllers/user.controllers');

const route = express();

route.get('/', getAllUsers);


module.exports = route;