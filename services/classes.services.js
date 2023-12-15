const classesModel = require('../models/classes.model');
const Classes = require('../models/classes.model');
const teacherModel= require('../models/teachers.model')

//Servicio para crear una clase
const createClass = async ({ name, teacher, date, hour, image }) => {

    const newClass = await Classes.create({
        name,
        teacher,
        date,
        hour,
        image,
    });

    if (!newClass) throw new Error('No se pudo crear la clase');
    return newClass;
}; 

// Servicio para obtener todas las clases
const allClasses = async () => {
    //Busca y muestra todas las clases y su relacion con los usuarios y con los profesores cada uno con sus respectivos datos  utilizando el método populate
    const classes = await Classes.find().populate({
        path: 'teacher users',
        select: 'name lastName email'
    });

    if (!classes) throw new Error('No se pudo obtener el listado de clases');
    return classes;
}

//Servicio para modificar una clase ya creada
const modifyClass = async ({ name, hour, date, teacher, image }, {id}) => {


    let query = {};

    if(name){
        query.name = name;
    }
    if (date) {
        query.date = date;
    }
    if (hour) {
        query.hour = hour;
    }
    if(teacher){
        query.teacher = teacher;

        //SECTOR PARA ELIMINAR RELACION CON EL PROFESOR ANTERIOR CON ESTA CLASE
        //Guardamos el ID del profesor
        const infoClass = await classesModel.findById(id);
        const oldTeacher = infoClass.teacher;
        //Comprobamos que no se haya ingresado el mismo profesor
        if(teacher!= oldTeacher){
            //Llamamos a nuestro modelo de teacher y lo buscamos por id
            const deleteTeacher = await teacherModel.findById(oldTeacher);
            //Eliminamos el ID de la clase del antiguo profesor
            deleteTeacher.classes=deleteTeacher.classes.filter((idclass)=> idclass._id!=id);
            //Guardamos cambios
            deleteTeacher.save();
        }

        
        //SECTOR PARA AGREGAR LA RELACION CON EL NUEVO PROFESOR ASIGNADO A LA CLASE
        //Llamamos a nuestro modelo de teachers y buscamos el profesor
        const teachersRel = await teacherModel.findById(teacher);
        //Comprueba si la clase ya esta agregado en este profesor
        if (!teachersRel.classes.includes(id)){
            //Si no existe guardamos el ID en la key de "classes" y se vera reflejado en el nuevo profesor
            teachersRel.classes.push(id);
        }
        //Guardamos cambios
        await teachersRel.save();
    }
    if (image) {
        query.image = image; 
    }
    //Busca la clase ingresada la compara y luedo la actualiza con el resto de datos ingresados
    const searchClass = await Classes.findByIdAndUpdate(id,query);

    //Devuelve un error si es que no se encontró la clase
    if (!searchClass) throw new Error('No se pudo editar la clase');
    return searchClass;
};

const removingClass = async ({ id }) => {
    //Elimina la clase del ID ingresado
    const removedClass = await Classes.findByIdAndDelete(id);
    
    //Devuelve un error si es que no se encontró la clase
    if(!removedClass) throw new Error( 'No se pudo eliminar la clase');

    //Retorna la clase eliminada
    return removedClass;
};

module.exports = {
    createClass,
    allClasses,
    modifyClass,
    removingClass
};
