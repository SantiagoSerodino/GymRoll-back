const mongoose = require ('mongoose')

const connection = async () => {
    try{
        const urlApi = process.env.STRING_CONNECTION;

        await mongoose.connect(urlApi);
        console.log('Conexión a la Base de Datos Exitosa');
    }
    catch(error){
        console.log(error);
    }
    
}

module.exports = {
    connection
}