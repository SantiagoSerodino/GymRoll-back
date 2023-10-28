const {
    getAllusersService
  } = require('../services/user.services'); 

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
    getAllUsers,
  };