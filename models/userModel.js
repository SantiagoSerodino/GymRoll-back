const {Schema, model} = require('mongoose');

//esquema de Usuario
const userSchema = new Schema({
  // email de tipo string requerido
  email: {
    type: String,
    required: true,
    unique: true,
  },  
  // contraseña de tipo string requerida 
  password: {
    type: String,
    required: true,
  },
      // se define names de tipo String  con condicion de requerido 
  name: {
    type: String,
    required: true,
  },
    // se define lastName de tipo String  con condicion de requerido 
  lastName: {
    type: String,
    required: true,
  },
     // se define phoneNumber de tipo Number  con condicion de requerido  
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
    // se define contractedPlan de tipo String con condicion de no requerido 
  contractedPlan: {
    type: String,
    required: false
  },

  admin: {
    type: Boolean,
    default: false,
  },
// 
  classes: {
    type : Schema.Types.ObjectId,
    ref : 'Classes',
  },
});

module.exports = model('User', userSchema, 'Users');
