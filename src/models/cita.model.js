const mongoose = require("mongoose");

let Schema = mongoose.Schema;

var citasSchema = Schema({

  nombre: String,
  apellido: String,
  peso: String,
  enfermedades: String,
  edad: Number,
  estatura: String,
  direccion: String,
  pais: String,
  numeroTurno: Number,
  fecha: String,
  hora: String,
  telefono: Number,
  
  doctor: { type: Schema.Types.ObjectId, ref: "Usuarios" },
  idUsuario: { type: Schema.Types.ObjectId, ref: "usuarios" }

});

module.exports = mongoose.model("Citas", citasSchema);
