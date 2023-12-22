const { createTeacher, teachersList,modifyTeacher,removingTeacher,addClass } = require('../services/teacher.services');

//Controlador para registrar profesores
const registerTeacher = async ( req, res, next ) => {
    try {
        await createTeacher(req.body);
        res.status(201).send("Profesor creado con éxito");

    }catch (err) {
        next(err);
    }
};

//Controlador para mostrar todos los profesores
const getAllTeachers = async ( req, res, next ) => {
    try {
        const teacherList = await teachersList()
        res.status(200).json(teacherList);

    }catch (err) {
        next(err);
    }
};

//Controlador para editar o actualizar los profesores por ID
const editTeacher = async ( req, res, next ) => {
    try {
        await modifyTeacher(req.body,req.params);
        res.status(200).send("Profesor actualizado con éxito")

    }catch (err) {
        next(err);
    }
}

//Controlador para eliminar los profesores por ID
const deleteTeacher = async ( req, res, next ) => {
    try {
        await removingTeacher(req.params);
        res.status(200).send("Profesor eliminado con éxito");
        
    }catch (err) {
        next(err);
    }
}


module.exports = {
    registerTeacher,
    getAllTeachers,
    editTeacher,
    deleteTeacher
}