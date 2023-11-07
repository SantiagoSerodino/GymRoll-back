
const { createUserService, getAllusersService,userModified } = require('../services/user.services');

//Controlador para crear un usuario
const createUser = async (req, res) => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//Controlador para obtener el listado de todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllusersService(req.headers);
    res.status(201).json( {users} );
  } catch (error) {
    console.log(error)
    res.status(501).json({ error });
  }
};

//Controlador para editar un usuario
const editUser = async (req,res) => {
  try {
    const userEdited= await userModified(req.body);
    res.status(201).json({userEdited})    
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.message})    
  }
}

module.exports = {
  createUser,
  getAllUsers,
  editUser
};