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

const allClasses = async () => {

    const classes = await Classes.find().populate({
        path: 'teacher users',
        select: 'name lastName email'
    });

    if(!classes) throw new Error('No se pudo obtener el listado de clases');

    //retorna la clase creada
    return classes;
}

//Servicio para modificar una clase ya creada
const modifyClass = async ({name,teacher}) => {

    const searchClass = await Classes.findOneAndUpdate({name:name},{teacher:teacher});

    //develve un error si es que no se pudo modificar la clase
    if(!searchClass) throw new Error('No se pudo crear la clase');

    //retorna la clases modificada
    return searchClass;

};

const removingClass = async ({name}) => {

    const removedClass = await Classes.deleteOne ({name : name});
    
    //devuelve un error si es que no se pudo elimianr la clase
    if(!removedClass) throw new Error( 'No se pudo eliminar la clase')

    //retorna la clase eliminada
    return removedClass
};

module.exports = {
    createClass,
    allClasses,
    modifyClass,
    removingClass
}