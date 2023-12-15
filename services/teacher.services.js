const classesModel = require("../models/classes.model");
const Teachers = require("../models/teachers.model");
const bcrypt = require("bcrypt");

//Funcion para encriptar las contraseñas ingresadas
const encryptPassword = async (password) => {
    const SALT_ROUNDS = 10;
    const passwordHashed = await bcrypt.hash(password, SALT_ROUNDS);
    return passwordHashed;
};

//Servicio para crear un profesor
const createTeacher = async ({ user, password, name, lastName, idClasses }) => {

    const passwordHashed = await encryptPassword(password);

    const newTeacher = await Teachers.create({
        user,
        password: passwordHashed,
        name,
        lastName,
        classes : idClasses
    });

    //llamamos a nuestro modelo de clases
    const classesRel = await classesModel.findById(idClasses);

    //Guardamos el id del profesor creado en la key de "teacher" en el modelo de clases asi se ve reflejado en la base de datos
    if(idClasses) {
        classesRel.teacher=newTeacher._id;
        await classesRel.save();
    }

    //Si es que no encuentra el usuario o hubo algun problema devuelve error a nuestro controllador
    if (!newTeacher) throw new Error("No se pudo crear el Profesor");
    return newTeacher;
};

//Servicio para mostrar todos los profesores
const teachersList = async () => {
    
    //con el metodo populate mostramos los datos de la clase y no solo el id
    const teacherList = await Teachers.find().populate({
        path: 'classes',
        select: 'name date hour'
    });

    if (!teacherList)
        throw new Error("No se pudo conseguir la lista de Profesores");
    return teacherList;
};

//Servicio para modificar un profesor
const modifyTeacher = async ({ user, password, classes },{id}) => {
    
    //Encriptamos la contraseña con nuestra funcion encryptPassword
    const passwordHashed = await encryptPassword(password);


    //buscamos el usuario por el usuario y lo editamos con la informacion ingresada
    const teacher = await Teachers.findByIdAndUpdate (id,{password:passwordHashed,classes:classes,user:user});


    //Si es que no encuentra el usuario o hubo algun problema devuelve error
    if (!teacher) throw new Error("Hubo un error al actualizar el profesor");
    return teacher;
};

//servicio para eliminar un profesor
const removingTeacher = async ({ id }) => {
    const teachers = await Teachers.findById (id);
    const classes = teachers.classes


    const deletedTeacher = await Teachers.findByIdAndDelete (id);

    //llamamos a nuestro modelo de clases
    const classesRel = await classesModel.findById(classes);
    

    // Actualizamos el objeto "teacher" en el modelo de clases a un objeto vacio para añadir futuros profesores
    if(classesRel) {
        classesRel.teacher= undefined;
        classesRel.save();
    }



    if(!deletedTeacher) throw new Error ('No se pudo eliminar el profesor')
    return deletedTeacher
};

//servicio para añadir mas de una clase a un profesor
const addClass = async ({ classes }, { id }) => {
    const classAdded = await Teachers.findOne(id);
    classAdded.classes.push(classes);
    await classAdded.save();
  


    //llamamos a nuestro modelo de clases
    const classesRel = await classesModel.findById(classes);

    //Guardamos el id del profesor creado en la key de "teacher" en el modelo de clases asi se ve reflejado en la base de datos
    if(classes) {
        classesRel.teacher=classAdded._id;
        await classesRel.save();
    };

    if(!classAdded) throw new Error ('No se pudo eliminar el profesor')
    return classAdded
};
 
module.exports = {
    createTeacher,
    teachersList,
    modifyTeacher,
    removingTeacher,
    addClass
};
