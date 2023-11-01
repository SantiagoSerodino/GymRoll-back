const express = require ('express');
const {connection} = require ('../db/connect');
const userRoutes = require ('../routes/user.routes');
const ClassesRoutes = require ('../routes/classes.routes')
//instanciando express
const app = express();

//MiddleWares
require('dotenv').config();
app.use(express.json());

//Definiendo puerto
const port = process.env.PORT;

//Definiendo rutas
app.use('user',userRoutes);
app.use('/classes', ClassesRoutes);

//Funcion para esuchar puerto
app.listen (port, () => {
    console.log(`Estamos escuchando el puerto: ${port}`);
})

connection();