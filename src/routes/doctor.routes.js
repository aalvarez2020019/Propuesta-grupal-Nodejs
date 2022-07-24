const express = require('express');
const doctorController = require('../controllers/doctor.controller');
const md_autentificacion = require('../middlewares/autenticacion');

const api = express.Router();

api.get('/verUsers', md_autentificacion.Auth, doctorController.verUsers);

// CITAS DOCTOR ROL DOCTOR
api.get('/citasDoctor', md_autentificacion.Auth, doctorController.citasDoctor);

// AGREGAR DATOS
api.post('/agregarDatos', md_autentificacion.Auth, doctorController.agregarDatos);

// editar datos
api.put("/editarDatos/:idDatos", md_autentificacion.Auth, doctorController.editarDatos);

// eliminar datos
api.delete('/eliminarDatos/:idDatos', md_autentificacion.Auth, doctorController.eliminarDatos);

// ver por id
api.get('/buscarDatosId/:idDatos', md_autentificacion.Auth, doctorController.buscarDatosId);

// obtener datos por doctor
api.get('/obtenerDatosDoctor', md_autentificacion.Auth, doctorController.obtenerDatosDoctor);

// ver datos por el id del doctor
api.get('/datosDoctorId/:doctor', md_autentificacion.Auth, doctorController.datosDoctorId);


module.exports = api;
