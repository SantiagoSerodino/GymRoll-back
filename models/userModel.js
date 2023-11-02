const {Schema, model} = require('mongoose');

//esquema de Usuario
const userSchema = new Schema({
    // se define userName de tipo Stryng  con condicion de requerido y usuario unico 
  userName: {
    type: String,
    required: true,
    unique: true,
  },
     // se define password de tipo Stryng  con condicion de requerido 
  password: {
    type: String,
    required: true,
  },
    // se define email de tipo Stryng  con condicion de requerido y usuario unico 
  email: {
    type: String,
    required: true,
    unique: true,
  },  
  names: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  contractedPlan: {
    type: String,
    required: true,
  },
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
