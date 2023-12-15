//Importamos modulos necesarios
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const classesModel = require ('../models/classes.model');
const jwt = require('jsonwebtoken');

// Servicio para crear usuarios con sus contraseñas encriptadas
const createUserService = async ({
  email,
  password,
  name,
  lastName,
  contractedPlan,
  phoneNumber,
  classes,
  admin,
}) => {
  //Encriptar contraseñas
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //Se instancia la estructura del modelo de usuario
  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
    lastName,
    phoneNumber,
    contractedPlan,
    classes,
    admin
  });

  //Llamamos a nuestro modelo de clases
  const usersRel = await classesModel.findById(classes);

  //Guardamos el id del usuario creado en la key de "users" en el modelo de clases asi se ve reflejado en la base de datos
  if(classes) {
    usersRel.users.push(newUser._id);
    await usersRel.save();
  };

  //Linea para manejar errores y devolver el usuario al contralador en caso de que no lo haya
  if (!newUser) throw new Error ('hubo un error al crear el usuario');
  return newUser;
};

//Servicio para iniciar sesion y validacion
const loginUserService = async ({
  email,
  password,
}) =>{
  let userFounded;
  const secretKey = process.env.SECRET_KEY;

  if (email) {
    userFounded = await User.findOne({ email })
  }

  if (!userFounded) throw new Error('Las credenciales no coinciden');

  const passwordMatch = await bcrypt.compare(password, userFounded.password);

  if (!passwordMatch) throw new Error('Las credenciales no coinciden');
  
  const userWhitoutPassword = userFounded._doc;
  delete userWhitoutPassword.password

  const payload = {
    userWhitoutPassword,
  }

  const token = jwt.sign(payload, secretKey, { 
    expiresIn: '1h' 
  });

  return {
    token,
    userWhitoutPassword
  };

};

//Servicio para obtener el listado de usuarios 
const getAllusersService = async ({ username, email, name, lastName, phoneNumber, contractedPlan, classes, admin, users }) => {
  //Consulta sin filtros
  let query = {}; 

  //Consultas con filtros por cada detalle
  if (username) {
    query.userName = username;
  }
    
  if (email) {
    query.email = email;
  }

  if(name){
    query.names = name;
  }

  if(lastName){
    query.lastName = lastName;
  }

  if(phoneNumber){
    query.phoneNumber = phoneNumber;
  } 

  if(contractedPlan){
    query.contractedPlan = contractedPlan;
  }

  if(users){
    query.users = [users];
  }

  if(classes){
    query.classes = classes;
  }
    
  if (admin !== undefined) {
    query.admin = admin;
  }

  //Hace la consulta con los filtros o sin ellos y muestra los datos especificados de la relacion con classes 
  const usersList = await User.find(query).populate({
    path: 'classes',
    select: 'name date hour' 
  });
  //Maneja los errores y retorna los usuarios si es que no los hay
  if (!usersList) {
    throw new Error('usuarios no encontrados');
  };

  return usersList;
    
};

//Servicio para editar un usuario
const userModified = async ({password,classes,contractedPlan},{id}) => {
  let query = {}

  if(password){
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    query.password = hashedPassword;
    
  }
  if(classes){
    query.classes = classes;
  }

  if(contractedPlan){
    query.contractedPlan = contractedPlan;
  }

  //Busca el usuario por el ID ingresado y luego de encontrarlo lo actualiza con el resto de datos ingresados
  const userModify = await User.findByIdAndUpdate (id,query);
  
  //Llamamos a nuestro modelo de clases
  const usersRel = await classesModel.findById(classes);
  
  //Guardamos el id del usuario editado en la key de "users" en el modelo de clases asi se ve reflejado en la base de datos
  usersRel.users.push(userModify._id);
  await usersRel.save();

  //Maneja los errores y retorna el usuario modificado si es que no los hay
  if(!userModify) throw new Error ('No se pudo modificar el Usuario');
  return userModify
};

//Servicio para eliminar un usuario
const deletingUsers = async ({id}) =>{

  //Realiza la busqueda por el ID y luego lo elimina
  const selectUser = await User.findByIdAndDelete(id);

  //Maneja los errores y retorna los usuarios con el elemento eliminado si es que no los hay
  if(!selectUser) throw new Error ('No se pudo eliminar el Usuario');
  return selectUser
};


module.exports = {
  createUserService,
  getAllusersService,
  userModified,
  loginUserService,
  deletingUsers
};