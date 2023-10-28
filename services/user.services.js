const User = require('../models/userModel');

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
    getAllusersService,
  };