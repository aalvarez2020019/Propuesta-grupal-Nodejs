// CONTROLADOR DE USUARIOS
const Usuarios = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


// Registrar administrador por default
function registrarAdmin() {

  var modeloUsuario = new Usuarios();

  Usuarios.find({ nombre: "AdminApp" }, (err, usuarioEncontrado) => {

    if (usuarioEncontrado.length > 0) {

    } else {

      modeloUsuario.nombre = "AdminApp";
      modeloUsuario.email = "AdminApp";
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

// Logearse
function login(req, res) {

  var parametros = req.body;

  Usuarios.findOne({ email: parametros.email }, (err, emailEncontrado) => {

    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

    if (emailEncontrado) {

      bcrypt.compare(parametros.password, emailEncontrado.password,

        (err, verificacionPassword) => {
          
          if (verificacionPassword) {

            if (parametros.obtenerToken === "true") {

              return res.status(200).send({ token: jwt.crearToken(emailEncontrado) });

            } else {

              emailEncontrado.password = undefined;

              return res.status(200).send({ Usuario: emailEncontrado });
            }
          } else {
            return res.status(500).send({ mensaje: "Las contrasena no coincide" });
          }
        }
      );
    } else {
      return res.status(500).send({ mensaje: "Error, el correo no se encuentra registrado" });
    }
  });
}



// ObtenerUsuarios
function obtenerUsuarios(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }

  Usuarios.find((err, usuariosEncontrados) => {
    if (err) return res.status(500).send({ mensaje: 'Error al buscar los hoteles' })
    if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'No existen hoteles' })

    return res.status(200).send({ Usuario: usuariosEncontrados })
})
}



// Buscar usuario por id
function obtenerUsuarioId(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el rol usuario tiene permisos" });
  }

  var idUsuario = req.params.idUsuario;

  Usuarios.findById(idUsuario, (err, idEncontrado) => {
    if (err)return res.status(500).send({ mensaje: "Error en la peticion del Usuario" });
    if (!idEncontrado) return res.status(500).send({ mensaje: "Error al obtener los datos" });
    return res.status(200).send({ Usuario: idEncontrado });
  });
}




// Registrar HOSPITALES
function hospitalesRegistrar(req, res) {
    let params = req.body;
    let usuariosModel = new Usuarios();


    if (params.nombre && params.email && params.password && params.direccion) {

      usuariosModel.nombre = params.nombre;
      usuariosModel.apellido = 'hospital';
      usuariosModel.email = params.email;
      usuariosModel.password = params.password;
      usuariosModel.direccion = params.direccion;
      usuariosModel.edad = 'hospital';
      usuariosModel.rol = "ROL_HOSPITAL";

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



                            
module.exports = {
    registrarAdmin,
    hospitalesRegistrar,
    login,
    obtenerUsuarioId,
    obtenerUsuarios,    
}
