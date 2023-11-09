//Importamos modulos necesarios
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const classesModel = require ('../models/classes.model')

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
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
    lastName,
    phoneNumber,
    contractedPlan,
    classes
  })

  //llamamos a nuestro modelo de clases
  const usersRel = await classesModel.findById(classes);

  //Guardamos el id del usuario creado en la key de "users" en el modelo de clases asi se ve reflejado en la base de datos
  if(classes) {
    usersRel.users.push(newUser._id);
    await usersRel.save();
  }


  if (!newUser) throw new Error ('hubo un error al crear el usuario');
  return newUser;
};

//Servicio para obtener el listado de usuarios 
const getAllusersService = async ({ username, email, name, lastName, phoneNumber, contractedPlan,classes, admin, users }) => {
  //Consulta sin filtros
  let query = {}; 

  //Consultas con filtros
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
    query.users = [users]
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
  }
  return usersList;
  
}

//Servicio para editar un usuario
const userModified = async ({email,password,classes,contractedPlan,_id}) => {
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
    query.contractedPlan = contractedPlan
  }

  const userModify = User.findOneAndUpdate ({email:email},query);
  
  //llamamos a nuestro modelo de clases
  const usersRel = await classesModel.findById(classes);
  
  //Guardamos el id del usuario editado en la key de "users" en el modelo de clases asi se ve reflejado en la base de datos
  usersRel.users.push(userModify._id);
  await usersRel.save()

  if(!userModify) throw new Error ('No se pudo modificar el Usuario');
  return userModify
}


  module.exports = {
    createUserService,
    getAllusersService,
    userModified
  };