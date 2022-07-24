const Usuarios = require('../models/usuarios.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');



// Editar usuarios
function editarUsuarios(req, res) {

  var idUser = req.params.idUsuario;
  var parametros = req.body;

  
  Usuarios.findByIdAndUpdate(idUser, parametros,{ new: true },(err, editarControl) => {

      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

      if (!editarControl) return res.status(403).send({ mensaje: "Error al editar el control" });

      return res.status(200).send({ Usuario: editarControl });

    }
  );
}

// Registrar administrador por default
function registrarAdmin() {

    var modeloUsuario = new Usuarios();
  
    Usuarios.find({ nombre: "SuperAdmin" }, (err, usuarioEncontrado) => {
  
      if (usuarioEncontrado.length > 0) {
  
      } else {
  
        modeloUsuario.nombre = "SuperAdmin";
        modeloUsuario.email = "SuperAdmin";
        modeloUsuario.rol = "ROL_ADMIN";
  
        bcrypt.hash("123456", null, null, (err, passwordEncriptada) => {
  
          modeloUsuario.password = passwordEncriptada;
  
          modeloUsuario.save((err, usuarioGuardado) => {
  
  
            if (err) return console.log("Error en la peticion");
  
            if (!usuarioGuardado) return console.log("Error al registrar Admin");
  
            return console.log("usuario registrado");
  
          });
        });
      }
    });
  }
  


// LOGIN
function Login(req, res) {
    var parametros = req.body;

    Usuarios.findOne({ email : parametros.email }, (err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(usuarioEncontrado){
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword)=>{//TRUE OR FALSE
                    if ( verificacionPassword ) {
                        if(parametros.obtenerToken === 'true'){
                            return res.status(200).send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;
                            return  res.status(200).send({ Usuario: usuarioEncontrado })
                        }

                    
                    } else {
                        return res.status(500).send({ mensaje: 'La contraseña no es correcta, intentalo de nuevo'});
                    }
                })

        } else {
            return res.status(500).send({ mensaje: 'Error, el correo no se encuentra, intentelo de nuevo'})
        }
    })
}

// registrarse login
function registrarUsuarios(req, res) {

    let params = req.body;
    let usuariosModel = new Usuarios();

    if (params.nombre && params.apellido && params.email && params.password && params.direccion && params.edad) {

      usuariosModel.nombre = params.nombre;
      usuariosModel.apellido = params.apellido;
      usuariosModel.email = params.email;
      usuariosModel.password = params.password;
      usuariosModel.direccion = params.direccion;
      usuariosModel.edad = params.edad;
      usuariosModel.rol = "ROL_USUARIO";

    Usuarios.find({$and: [{ email: usuariosModel.email }]}).exec((err, usuarioEncontrado) => {

        if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
            
          return res.status(500).send({ mensaje: "El email ya existe" });

        } else {
          bcrypt.hash(params.password, null, null, (err, passwordencriptada) => {

            usuariosModel.password = passwordencriptada;
            usuariosModel.save((err, usuarioRegistrado) => {
              if (usuarioRegistrado) {
                return res.status(200).send({ Usuario: usuarioRegistrado });
              } else {
                return res.status(500).send({ mensaje: "No se puede registrar" });
              }
            });
          });
        }
      });

     } else {
      return res.status(500).send({ mensaje: "Porfavor llenar todos los campos" });
    } 

   
}

// registrar Doctor
function registrarDoctor(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
  }

    let params = req.body;
    let usuariosModel = new Usuarios();

    if (params.nombre && params.apellido && params.email && params.password && params.direccion && params.edad) {

      usuariosModel.nombre = params.nombre;
      usuariosModel.apellido = params.apellido;
      usuariosModel.email = params.email;
      usuariosModel.password = params.password;
      usuariosModel.direccion = params.direccion;
      usuariosModel.edad = params.edad;
      usuariosModel.rol = "ROL_DOCTOR";

    Usuarios.find({$and: [{ email: usuariosModel.email }]}).exec((err, usuarioEncontrado) => {

        if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
            
          return res.status(500).send({ mensaje: "El email ya existe" });

        } else {
          bcrypt.hash(params.password, null, null, (err, passwordencriptada) => {

            usuariosModel.password = passwordencriptada;
            usuariosModel.save((err, usuarioRegistrado) => {
              if (usuarioRegistrado) {
                return res.status(200).send({ Usuario: usuarioRegistrado });
              } else {
                return res.status(500).send({ mensaje: "No se puede registrar" });
              }
            });
          });
        }
      });

     } else {
      return res.status(500).send({ mensaje: "Porfavor llenar todos los campos" });
    } 
 
}



// ELIMINAR
function EliminarUsuarios(req, res){

  var idUsuario = req.params.idUsuario;

  Usuarios.findByIdAndDelete(idUsuario, (err, usuarioEliminado) => {

    if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
    if(!usuarioEliminado) return res.status(404).send( { mensaje: "Error al eliminar"});

    return res.status(200).send({ Usuario: usuarioEliminado});
})

}


// Ver usuarios ROL DOCTOR
function obtenerDoctores(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }

  Usuarios.find({rol: "ROL_DOCTOR"},(err, usuariosEncontrados) => {

    if (err) return res.status(500).send({ mensaje: 'Error al buscar los usuarios' })
    if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'No existen hoteles' })

    return res.status(200).send({ Usuario: usuariosEncontrados })
})

}


// Ver usuarios ROL USUARIO
function obtenerUsuarios(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }

  Usuarios.find({rol: "ROL_USUARIO"},(err, usuariosEncontrados) => {

    if (err) return res.status(500).send({ mensaje: 'Error al buscar los usuarios' })
    if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'No existen hoteles' })

    return res.status(200).send({ Usuario: usuariosEncontrados })
})

}

// Ver doctores ROL USUARIO
function verDoctoresUser(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }

  Usuarios.find({rol: "ROL_DOCTOR"},(err, usuariosEncontrados) => {

    if (err) return res.status(500).send({ mensaje: 'Error al buscar los usuarios' })
    if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'No existen hoteles' })

    return res.status(200).send({ Usuario: usuariosEncontrados })
})

}

// Doctores ID
function buscarUsuariosId(req,res){

  var idDoc = req.params.idDoctor;

  Usuarios.findById(idDoc,(err, doctorEncontrado)=>{

    if(err) return res.status(500).send({mensaje: 'Error en la peticion'});

    if(!doctorEncontrado) return res.status(404).send({mensaje:'Error al obtener los datos'});

    return res.send({Usuario: doctorEncontrado})

  })    
}




module.exports ={
    Login,
    EliminarUsuarios,
    registrarAdmin,
    registrarUsuarios,
    registrarDoctor,
    obtenerDoctores,
    obtenerUsuarios,
    verDoctoresUser,
    buscarUsuariosId,
    editarUsuarios
}


