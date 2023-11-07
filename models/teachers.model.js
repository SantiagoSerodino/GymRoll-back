const { Schema, model } = require('mongoose');

//Se instancia el esquema de profesores
const teacherSchema = new Schema({
    //Se define "user" de tipo string, que es requerido y es único
    user: {
        type: String,
        unique: true,
        required: true
    },
    //Se define "password" de tipo string y es requerido
    password: {
        type: String,
        required: true
    },
    //Se define "name" de tipo string, que es requerido y es único
    name: {
        type: String,
        required: true
    },
    //Se define "lastName" de tipo string, que es requerido y es único
    lastName: {
        type: String,
        required: true
    },
    //Se define "admin" de tipo boolean, que tomara de valor default verdadero
    admin: {
        type: Boolean,
        default: true
    },
    //Se define la realcion entre "teachers" y "classes" 
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Classes'
    }]
});

module.exports = model('Teachers', teacherSchema, 'Teachers');