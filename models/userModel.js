const {Schema, model} = require('mongoose');

//esquema de Usuario
const userSchema = new Schema({
 
  name: {
    type: String,
    required: true,
  },
  
  lastName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
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
