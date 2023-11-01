//Importamos modulos necesarios
const User = require('../models/userModel');
const bcrypt = require('bcrypt');const bcrypt = require('bcrypt');

// Servicio para crear usuarios con sus contraseñas encriptadas
const createUserService = async ({
  userName,
  password,
  email,
  admin,
}) => {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    userName,
    email,
    password: hashedPassword,
    admin,
  })

  if (!newUser) throw new Error ('hubo un error al crear el usuario');
  return newUser;
};


const getAllusersService = async ({ username, email, names, lastName, phoneNumber, contractedPlan, admin }) => {
    let query = {}; 
  
    if (username) {
      query.userName = username;
    }
  
    if (email) {
      query.email = email;
    }

    if(names){
        query.names = names
    }

    if(lastName){
        query.lastName = lastName
    }

    if(phoneNumber){
        query.phoneNumber = phoneNumber
    }
    if(contractedPlan){
        query.contractedPlan = contractedPlan
    }
  
    if (admin !== undefined) {
      query.admin = admin;
    }

    const users = await User.find(query);
  
    if (!users) {
      throw new Error('usuarios no encontrados');
    }
    return users;
  
  }


  module.exports = {
    createUserService,
    getAllusersService,
  };