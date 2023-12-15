const { Schema, model } = require('mongoose');

// Se instancia el esquema de clases
const classesSchema = new Schema({
    // Se define "name" de tipo string, que es requerido y es único
    name: {
        type: String,
        required: true,
        unique: true
    },
    // Se define "date" de tipo string y que es requerido
    date: {
        type: String,
        required: true
    },
    // Se define "hour" de tipo string y que es requerido
    hour: {
        type: String,
        required: true,
        unique: false
    },
    // se define "image" de tipo string y que no es requerido
    image: {
        type: String,
        required: false
    },
    // Se define la relación entre "classes" y "teachers"
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "Teachers"
    },
    // Se define la relación de "classes" y "users"
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = model('Classes', classesSchema, 'Classes');
