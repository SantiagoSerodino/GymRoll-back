
const express = require ('express');
const {connection} = require ('../db/connect')

//instanciando express
const app = express();

//MiddleWares
require('dotenv').config();
app.use(express.json());

//Definiendo puerto
const port = process.env.PORT;







app.listen (port, () => {
    console.log(`Estamos escuchando el puerto: ${port}`);
})

connection();