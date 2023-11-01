const  classesServices = require('../services/classes.services');

const createClass = async (req,res) => {
    try {
        const newClass = await classesServices.createClass(req.body);
        res.status(201).json({newClass})
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}

module.exports = {
    createClass
}