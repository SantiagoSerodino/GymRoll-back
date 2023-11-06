//Importamos modulos necesarios
const User = require('../models/userModel');
const bcrypt = require('bcrypt');const bcrypt = require('bcrypt');

// Servicio para crear usuarios con sus contraseñas encriptadas
const createUserService = async ({
  name,
  lastName,
  password,
  email,
  contractedPlan,
  clases,
  admin,
}) => {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    name,
    lastName,
    email,
    password: hashedPassword,
    contractedPlan,
    clases,
    admin,
  })

//llamamos a nuestro modelo de clases
const usersRel = await classesModel.findById(users);

//Guardamos el id del usuario creado en la key de "users" en el modelo de clases asi se ve reflejado en la base de datos
if(classes) {
    usersRel.user=newUser._id;
    await usersRel.save();
}


  if (!newUser) throw new Error ('hubo un error al crear el usuario');
  return newUser;
};

const loginUserService = async ({
  email,
  password,
}) =>{
  let userFounded;

  if (email) {
    userFounded = await User.findOne({ email })
  }

  if (!userFounded) throw new Error('Las credenciales no coinciden');

  const passwordMatch = await bcrypt.compare(password, userFounded.password);

  if (!passwordMatch) throw new Error('Las credenciales no coinciden')

};

//Servicio para obtener el listado de usuarios 
const getAllusersService = async ({ username, email, name, lastName, phoneNumber, contractedPlan, admin, }) => {
    let query = {}; 
  
    if (username) {
      query.userName = username;
    }
  
    if (email) {
      query.email = email;
    }

    if(name){
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
    // hace la consulta 
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