
const { createUserService, getAllusersService, userModified, loginUserService, deletingUsers } = require('../services/user.services');

//Controlador para crear un usuario
const createUser = async (req, res) => {
  try {
    await createUserService(req.body);
    res.status(201).json("Usuario creado con éxito");
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controlador para iniciar sesion
const loginUser = async (req, res) => {
  try {
    const logedUser = await loginUserService(req.body);
    res.status(200).json({ logedUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//Controlador para obtener el listado de todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllusersService(req.headers);
    res.status(200).json( {users} );
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};

//Controlador para editar un usuario
const editUser = async (req,res) => {
  try {
    await userModified(req.body,req.params);
    res.status(200).send('Usuario actualizado con éxito')    
  } catch (error) {
    console.log(error);
    res.status(304).json({error: error.message});    
  }
}

//Controlador para eliminar un usuario
const deleteUser = async (req,res) => {
  try {
    await deletingUsers(req.params);
    res.status(200).send('Usuario eliminado con éxito');
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.message});
  }
}

module.exports = {
  createUser,
  getAllUsers,
  editUser,
  loginUser,
  deleteUser
};
