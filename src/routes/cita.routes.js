const express = require('express');
const citaController = require('../controllers/cita.controller');
const md_autentificacion = require('../middlewares/autenticacion');

const api = express.Router();

// agregar cita
api.post('/agregarCita', md_autentificacion.Auth, citaController.agregarCita);

// citas del usuario
api.get('/obtenerCitasUser', md_autentificacion.Auth, citaController.obtenerCitasUser);

// obtener citas doctor
api.get('/obtenerCitasDoc', md_autentificacion.Auth, citaController.obtenerCitasDoctor);


// ver Cita doctor
api.get('/verCitasDoctor/:doctor', md_autentificacion.Auth, citaController.verCitasDoctor);

// buscar cita id ROL_USUARIO  INFO HOSPITAL Y INFO PROFESIONAL DEL MEDICO
api.get('/buscarCitaId/:idCita', md_autentificacion.Auth, citaController.buscarCitaId);

module.exports = api;
