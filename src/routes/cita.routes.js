const express = require('express');
const citaController = require('../controllers/cita.controller');
const md_autentificacion = require('../middlewares/autenticacion');

const api = express.Router();

// agregar cita
api.post('/agregarCita', md_autentificacion.Auth, citaController.agregarCita);

// citas del usuario
api.get('/obtenerCitasUser', md_autentificacion.Auth, citaController.obtenerCitasUser);

// ver Cita doctor
api.get('/verCitasDoctor/:doctor', md_autentificacion.Auth, citaController.verCitasDoctor);

module.exports = api;
