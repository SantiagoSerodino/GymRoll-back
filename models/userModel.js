const {Schema, model} = require('mongoose');

//esquema de Usuario
const userSchema = new Schema({
 
  userName: {
    type: String,
    required: true,
    unique: true,
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
  admin: {
    type: Boolean,
    default: false,
  }
});

module.exports = model('User', userSchema);
