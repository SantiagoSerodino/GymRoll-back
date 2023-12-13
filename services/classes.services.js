const Classes = require('../models/classes.model');

// Servicio para crear una clase
const createClass = async ({ name, teacher, date, hour, users, image }) => {
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
    const classes = await Classes.find().populate({
        path: 'teacher users',
        select: 'name lastName email',
    });

    if (!classes) throw new Error('No se pudo obtener el listado de clases');
    return classes;
}

// Servicio para modificar una clase ya creada
const modifyClass = async ({ name, hour, date, teacher, image }) => {
    let query = {};
    if (name) {
        query.name = name;
    }
    if (date) {
        query.date = date;
    }
    if (hour) {
        query.hour = hour;
    }
    if (image) {
        query.image = image; 
    }

    const searchClass = await Classes.findOneAndUpdate({ name: name }, query, { new: true });

    if (!searchClass) throw new Error('No se pudo editar la clase');
    return searchClass;
};

const removingClass = async ({ name }) => {
    const removedClass = await Classes.deleteOne({ name: name });

    if (!removedClass) throw new Error('No se pudo eliminar la clase');
    return removedClass;
};

module.exports = {
    createClass,
    allClasses,
    modifyClass,
    removingClass
};
