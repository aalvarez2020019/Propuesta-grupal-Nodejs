// MODELO DE DATOS PROFESIONALES
const mongoose = require("mongoose");

let Schema = mongoose.Schema;

var DatosSchema = Schema({

  habitacion: String,
  sexo: String,
  horario: String,
  especialidad: String,
  telefono: Number,


  doctor: { type: Schema.Types.ObjectId, ref: "Usuarios" },


});

module.exports = mongoose.model("Datos", DatosSchema);