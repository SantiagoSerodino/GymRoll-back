const express = require ('express');
const {connection} = require ('../db/connect')

const app = express();

require('dotenv').config();
const port = process.env.PORT;
app.use(express.json());


app.use('user', );

app.listen (port, () => {
    console.log(`Estamos escuchando el puerto: ${port}`);
})

connection();