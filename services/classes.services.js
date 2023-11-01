const Classes = require('../models/classes.model');

//Servicio para crear una clase
const createClass = async ({ name, teacher, date, hour, users}) => {

    const newClass = await Classes.create({
        name,
        teacher,
        date,
        hour
    });

    //maneja errores de almacenamiento
    if (!newClass) throw new Error('No se pudo crear la clase');

    //retorna la clase creada
    return newClass;
};

//Servicio para obtener todas las clases
const allClasses = async () => {
    
    const classes = await Classes.find()

    if(!classes) throw new Error('No se pudo obtener el listado de clases');

    //retorna la clase creada
    return classes;
}

module.exports = {
    createClass,
    allClasses,
}