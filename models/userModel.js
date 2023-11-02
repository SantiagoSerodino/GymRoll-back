const {Schema, model} = require('mongoose');

//esquema de Usuario
const userSchema = new Schema({
    // se define userName de tipo String  con condicion de requerido y usuario unico 
  userName: {
    type: String,
    required: true,
    unique: true,
  },
    // se define password de tipo String  con condicion de requerido 
  password: {
    type: String,
    required: true,
  },
    // se define email de tipo String  con condicion de requerido y usuario unico 
  email: {
    type: String,
    required: true,
    unique: true,
  },  
    // se define contractedPlan de tipo String  con condicion de requerido y usuario unico 
  contractedPlan: {
    type: String,
    required: true,
  },
  // se define admin de tipo Boolean  con  condicion default 
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
