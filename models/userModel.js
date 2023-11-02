const {Schema, model} = require('mongoose');

//esquema de Usuario
const userSchema = new Schema({
  // usuario  de tipo string requerido y unico 
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  // contraseña de tipo string requerida 
  password: {
    type: String,
    required: true,
  },
  // email de tipo string requerido
  email: {
    type: String,
    required: true,
    unique: true,
  },  
   // nombres de tipo string requerido
  name: {
    type: String,
    required: true,
  },
  //apellido de tipo string requerido 
  lastName: {
    type: String,
    required: true,
  },
  //numero de telefono de tipo number requerido
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  // plan contratado 
  contractedPlan: {
    type: String,
    required: true,
  },
  // condicion de admin
  admin: {
    type: Boolean,
    default: false,
  },

  classes: {
    type : Schema.Types.ObjectId,
    ref : 'Classes',
  },
});

module.exports = model('User', userSchema);
