const  { createClass,allClasses } = require('../services/classes.services');

//Controlador para crear Clases
const registerClass = async (req,res) => {
    try {
        const newClass = await createClass(req.body);
        res.status(201).json(newClass)
        
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }

}

//Controlador para mostrar todas las clases creadas
const getAllClasses = async (req,res) => {
    try {
        const classes = await  allClasses();
        res.status(200).json(classes)
    } catch (error) {
        console.log(error);
        res.status(404).send({error: error.message})     
    }
}

module.exports = {
    registerClass,
    getAllClasses,
}