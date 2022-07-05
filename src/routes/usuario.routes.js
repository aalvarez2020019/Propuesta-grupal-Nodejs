const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

// Obtener por el id del usuario
api.get("/obtenerUsuarioId/:idUsuario", md_autenticacion.Auth, usuarioController.obtenerUsuarioId);

// Obtener Usuarios
api.get("/obtenerUsuarios", md_autenticacion.Auth, usuarioController.obtenerUsuarios);

// Logearse
api.post("/login", usuarioController.login);

// Registrar usuarios
api.post("/hospitalesRegistrar", usuarioController.hospitalesRegistrar);

module.exports = api;
