
const { createUserService, getAllusersService, userModified, loginUserService, deletingUsers } = require('../services/user.services');

//Controlador para crear un usuario
const createUser = async ( req, res, next ) => {
  try {
    await createUserService(req.body);
    res.status(201).json("Usuario creado con éxito");
  } catch (err) {
    next(err);
  }
};

// Controlador para iniciar sesion
const loginUser = async ( req, res, next ) => {
  try {
    const logedUser = await loginUserService(req.body);
    res.status(200).json({ logedUser });
  } catch (err) {
    next(err);
  }
};

//Controlador para obtener en pagina admin el listado de todos los usuarios
const getAllUsers = async ( req, res, next ) => {
  try {
    const users = await getAllusersService(req.headers);
    res.status(200).json( {users} );
  } catch (err) {
    next(err);
  }
};

//Controlador para editar un usuario
const editUser = async ( req, res, next ) => {
  try {
    const user = await userModified(req.body,req.params);
    res.status(200).send('Usuario actualizado con éxito')    
  } catch (err) {
    next(err);    
  }
}

//Controlador para eliminar un usuario
const deleteUser = async ( req, res, next ) => {
  try {
    await deletingUsers(req.params);
    res.status(200).send('Usuario eliminado con éxito');
    
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  editUser,
  loginUser,
  deleteUser
};
