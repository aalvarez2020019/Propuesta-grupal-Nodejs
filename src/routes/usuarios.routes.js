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
// api.put('/editarUsuarios', md_autentificacion.Auth, usuariosController.EditarUsuarios);

// eliminar
api.delete('/eliminarUsuarios', md_autentificacion.Auth, usuariosController.EliminarUsuarios);

// VER DOCTORES
api.get('/obtenerDoctores', md_autentificacion.Auth, usuariosController.obtenerDoctores);

// obtener usuarios
api.get('/obtenerUsuarios', md_autentificacion.Auth, usuariosController.obtenerUsuarios);

// ver doctores rol usuario
api.get('/verDoctoresUser', md_autentificacion.Auth, usuariosController.verDoctoresUser);

// buscar doctores id
api.get('/buscarDoctorId/:idDoctor', md_autentificacion.Auth, usuariosController.buscarUsuariosId);


module.exports = api
