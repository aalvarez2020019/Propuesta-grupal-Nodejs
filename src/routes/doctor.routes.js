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


/* CRUD HOSPITALES */
// agregar hospital
api.post('/agregarHospital', md_autentificacion.Auth, doctorController.agregarHospital);

// editar hospitales
api.put("/editarHospitales/:idHospital", md_autentificacion.Auth, doctorController.editarHospitales);

// eliminar hospitales
api.delete('/eliminarHospitales/:idHospital', md_autentificacion.Auth, doctorController.eliminarHospitales);

// ver hospitales por admin
api.get('/verhospitalesAdmin', md_autentificacion.Auth, doctorController.verhospitalesAdmin);

// ver hospitales general
api.get('/verHospitales', md_autentificacion.Auth, doctorController.verHospitales);

// hospitales id
api.get('/hospitalesId/:idHospital', md_autentificacion.Auth, doctorController.hospitalesId);

// hospitales inicio
api.get('/hospitalesInicio', doctorController.hospitalesInicio);


module.exports = api;
