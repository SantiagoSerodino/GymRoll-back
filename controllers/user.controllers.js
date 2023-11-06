
const { createUserService, getAllusersService } = require('../services/user.services');


const createUser = async (req, res) => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// controlador para iniciar sesión
const loginUser = async (req, res) => {
  try {
    const logedUser = await loginUserService(req.body);
    res.status(201).json({ logedUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// controlador para obtener el listado de todos los usuarios
  const getAllUsers = async (req, res) => {
    try {
      const users = await getAllusersService(req.headers);
      res.status(201).json({ users });
    } catch (error) {
      console.log(error)
      res.status(501).json({ error });
    }
  };

  module.exports = {
    createUser,
    getAllUsers,
    loginUser,
  };