const Classes = require('../models/classes.model');

//Servicio para crear una clase
const createClass = async ({ name, teacher, date, hour, users}) => {

    const newClass = await Classes.create({
        name,
        teacher,
        date,
        hour
    });

    //Maneja errores de almacenamiento
    if (!newClass) throw new Error('No se pudo crear la clase');

    //Retorna la clase creada
    return newClass;
};

//Servicio para obtener todas las clases
const allClasses = async () => {
    
    //Busca y muestra todas las clases y su relacion con los usuarios y con los profesores cada uno con sus respectivos datos  utilizando el método populate
    const classes = await Classes.find().populate({
        path: 'teacher users',
        select: 'name lastName email'
    });

      //Develve un error si es que no se pudo traer la lista de las clases
    if(!classes) throw new Error('No se pudo obtener el listado de clases');

    //Retorna la clase creada
    return classes;
}

//Servicio para modificar una clase ya creada
const modifyClass = async ({name,hour,date,teacher}) => {
    //Edicion sin filtros
    let query = {}
    //Edicion con filtros
    if(name){
        query.name = name;
    }
    if(date){
        query.date = date;
    }
    if(hour){
        query.hour = hour;
    }
    //Busca la clase ingresada la compara y luedo la actualiza con el resto de datos ingresados
    const searchClass = await Classes.findOneAndUpdate({name:name},query);

    //Develve un error si es que no se pudo modificar la clase
    if(!searchClass) throw new Error('No se pudo editar la clase');

    //Retorna la clases modificada
    return searchClass;

};

const removingClass = async ({name}) => {
    //Elimina la clase que sea igual al nombre ingresado
    const removedClass = await Classes.deleteOne ({name : name});
    
    //Devuelve un error si es que no se pudo elimianr la clase
    if(!removedClass) throw new Error( 'No se pudo eliminar la clase')

    //Retorna la clase eliminada
    return removedClass
};

module.exports = {
    createClass,
    allClasses,
    modifyClass,
    removingClass
}