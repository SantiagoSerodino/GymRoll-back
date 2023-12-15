const { createClass, modifyClass, allClasses,removingClass } = require('../services/classes.services')

// Controlador para crear Clases
const registerClass = async (req, res) => {
    try {
        await createClass(req.body);
        res.status(201).send("Clase creada con éxito")

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

//Controlador para editar o actualizar las clases por ID
const editClass = async (req, res) => {
    try {
        await modifyClass(req.body,req.params);
        res.status(200).send("Clase actualizada con éxito");

    } catch (error) {
        console.log(error);
        res.status(304).send({ error: error.message });
    }
};

//Controlador para eliminar una clase por ID
const deleteClass = async (req, res) => {
    try {
        await removingClass(req.params);
        res.status(200).send("Clase eliminada con éxito");

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
