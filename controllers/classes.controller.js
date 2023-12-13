const { createClass, modifyClass, allClasses,removingClass } = require('../services/classes.services')

// Controlador para crear Clases
const registerClass = async (req, res) => {
    try {
        const newClass = await createClass(req.body);
        res.status(201).json(newClass)

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

// Controlador para mostrar todas las clases creadas
const getAllClasses = async (req, res) => {
    try {
        const classes = await allClasses();
        res.status(200).json(classes);
    } catch (error) {
        console.log(error);
        res.status(404).send({ error: error.message });
    }
};

// Controlador para editar las clases creadas
const editClass = async (req, res) => {
    try {
        const editedClass = await modifyClass(req.body);
        res.status(200).json(editedClass);

    } catch (error) {
        console.log(error);
        res.status(304).send({ error: error.message });
    }
};

// Controlador para eliminar una clase
const deleteClass = async (req, res) => {
    try {
        const deletedClass = await removingClass(req.body);
        res.status(200).json(deletedClass);

    } catch (error) {
        console.log(error);
        res.status(304).send({ error: error.message });

    }
};

module.exports = {
    registerClass,
    getAllClasses,
    editClass,
    deleteClass,
};
