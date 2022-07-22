const express = require('express');
const doctorController = require('../controllers/doctor.controller');
const md_autentificacion = require('../middlewares/autenticacion');

const api = express.Router();

api.get('/verUsers', md_autentificacion.Auth, doctorController.verUsers);

// CITAS DOCTOR ROL DOCTOR
api.get('/citasDoctor', md_autentificacion.Auth, doctorController.citasDoctor);


module.exports = api;
