// MODELO DE HOSPITAL
const mongoose = require("mongoose");

let Schema = mongoose.Schema;

var HospitalSchema = Schema({

  nombre: String,
  pais: String,
  ciudad: String,
  direccion: String,
  telefono: Number,

});

module.exports = mongoose.model("Hospitales", HospitalSchema);
