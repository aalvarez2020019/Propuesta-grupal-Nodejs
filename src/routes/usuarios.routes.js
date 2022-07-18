const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');
const md_autentificacion = require('../middlewares/autenticacion');

var api = express.Router();

//OBTENER TOKENS
api.post('/login', usuariosController.Login);

// registrar usuarios
api.post('/registrarUsuarios', usuariosController.registrarUsuarios);

// registrar doctores
api.post('/registrarDoctor', md_autentificacion.Auth, usuariosController.registrarDoctor);


// editar y eliminar usuarios
api.put('/editarUsuarios', md_autentificacion.Auth, usuariosController.EditarUsuarios);

api.delete('/eliminarUsuarios', md_autentificacion.Auth, usuariosController.EliminarUsuarios)


module.exports = api
