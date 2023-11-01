const { Schema, model } = require('mongoose');

const teacherSchema = new Schema({
    user: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: true
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Classes'
    }]
});

module.exports = model('Teachers', teacherSchema, 'Teachers');