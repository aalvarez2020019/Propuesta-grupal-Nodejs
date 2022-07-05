// MODELO DE USUARIO
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let usuariosSchema = Schema({

  nombre: String,
  apellido: String, 
  email: String,
  password: String,
  rol: String,
  direccion: String,
  edad: String, 


});

module.exports = mongoose.model("usuarios", usuariosSchema);