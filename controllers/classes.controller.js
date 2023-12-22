const { createClass, modifyClass, allClasses,removingClass } = require('../services/classes.services')

// Controlador para crear Clases
const registerClass = async (req, res, next ) => {
    try {
        await createClass(req.body);
        res.status(201).send("Clase creada con éxito")

    }catch (err) {
        next(err);
    }
};

// Controlador para mostrar todas las clases creadas
const getAllClasses = async (req, res, next ) => {
    try {
        const classes = await allClasses();
        res.status(200).json(classes);
    } catch (err) {
        next(err);
    }
};

//Controlador para editar o actualizar las clases por ID
const editClass = async (req, res, next ) => {
    try {
        await modifyClass(req.body,req.params);
        res.status(200).send("Clase actualizada con éxito");

    }catch (err) {
        next(err);
    }
};

//Controlador para eliminar una clase por ID
const deleteClass = async (req, res, next ) => {
    try {
        await removingClass(req.params);
        res.status(200).send("Clase eliminada con éxito");

    } catch (err) {
        next(err);
    }
};

module.exports = {
    registerClass,
    getAllClasses,
    editClass,
    deleteClass,
};
