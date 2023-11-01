const { createTeacher, teachersList,modifyTeacher,removingTeacher,addClass } = require('../services/teacher.services');

const registerTeacher = async (req, res) => {
    try {
        const newTeacher = await createTeacher(req.body);
        res.status(201).json({ newTeacher });

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
};

const getAllTeachers = async (req, res) => {
    try {
        const teacherList = await teachersList()
        res.status(200).send(teacherList);

    } catch (error) {
        console.log(error);
        res.status(404).send({ error: error.message })

    }
};

const editTeacher = async (req, res) => {
    try {
        const teacherModified = await modifyTeacher(req.body);
        res.status(200).json(teacherModified)

    } catch (error) {
        console.log(error);
        res.status(404).send({ error: error.message })
    }
}

const deleteTeacher = async (req,res) => {
    try {
        const deletedTeacher = await removingTeacher(req.body);
        res.status(200).json(deletedTeacher);
        
    } catch (error) {
        console.log(error);
        res.status(404).send ({ error: error.message })
        
    }
}

const addClasstoTeacher = async (req,res) => {
    try {
        const addedClass = await addClass(req.body);
        res.status(200).json(addedClass);
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