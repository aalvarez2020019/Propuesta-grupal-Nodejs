const express = require('express');
const doctorController = require('../controllers/doctor.controller');
const md_autentificacion = require('../middlewares/autenticacion');

const api = express.Router();

api.get('/verUsers', md_autentificacion.Auth, doctorController.verUsers);

module.exports = api;
