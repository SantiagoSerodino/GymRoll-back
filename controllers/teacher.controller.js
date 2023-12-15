const { createTeacher, teachersList,modifyTeacher,removingTeacher,addClass } = require('../services/teacher.services');

//Controlador para registrar profesores
const registerTeacher = async (req, res) => {
    try {
        await createTeacher(req.body);
        res.status(201).send("Profesor creado con éxito");

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
};

//Controlador para mostrar todos los profesores
const getAllTeachers = async (req, res) => {
    try {
        const teacherList = await teachersList()
        res.status(200).json(teacherList);

    } catch (error) {
        console.log(error);
        res.status(404).send({ error: error.message });
    }
};

//Controlador para editar o actualizar los profesores por ID
const editTeacher = async (req, res) => {
    try {
        await modifyTeacher(req.body,req.params);
        res.status(200).send("Profesor actualizado con éxito")

    } catch (error) {
        console.log(error);
        res.status(404).send({ error: error.message })
    }
}

//Controlador para eliminar los profesores por ID
const deleteTeacher = async (req,res) => {
    try {
        await removingTeacher(req.params);
        res.status(200).send("Profesor eliminado con éxito");
        
    } catch (error) {
        console.log(error);
        res.status(404).send ({ error: error.message })
        
    }
}

const addClasstoTeacher = async (req,res) => {
    try {
        await addClass(req.body,req.params);
        res.status(200).send("Se añadió correctamente la clase al Profesor");
    } catch (error) {
        console.log(error);
        res.status(404).send({ error: error.message })        
    }
}

module.exports = {
    registerTeacher,
    getAllTeachers,
    editTeacher,
    deleteTeacher,
    addClasstoTeacher
}