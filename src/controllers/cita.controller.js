const Citas = require('../models/cita.model');

function agregarCita (req,res){

    if (req.user.rol !== "ROL_USUARIO") {
      return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
    }
  
    let citasModel = new Citas();
    let params = req.body;
  
    citasModel.nombre = params.nombre;
    citasModel.apellido = params.apellido;
    citasModel.peso = params.peso;
    citasModel.enfermedades = params.enfermedades;
    citasModel.edad = params.edad;
    citasModel.estatura = params.estatura;
    citasModel.direccion = params.direccion;
    citasModel.pais = params.pais;
    citasModel.numeroTurno = 0;
    citasModel.fecha = params.fecha;
    citasModel.hora = params.hora;

    citasModel.telefono = params.telefono;

    citasModel.doctor = params.doctor;

    citasModel.idUsuario = req.user.sub;


    
  
    /* if (params.nombre == '' || params.descripcion == '' || params.hotel == ''){
  
        return res.status(500).send({mensaje:'No puede hacer la peticion con campos vacios'})
    } */
  
    // Citas.findOne({hora: citasModel.hora}, (err, servicioEncontrado)=>{
  
       // if (err) return res.status(500).send({mensaje:'Error al consultar el evento'})
        // if (servicioEncontrado) return res.status(500).send({mensaje:'Ya esta reservada esa hora'})
  
        citasModel.save((err, citaGuardada)=>{

            if (err) return res.status(500).send({mensaje:'Error al guardar la habitacion'})
  
            if (!citaGuardada) return res.status(500).send({mensaje:'La peticion esta vacia'})
  
            return res.status(200).send({citaGuardada})
        })

    // })
}


// Obtener citas del usuario

function obtenerCitasUser(req, res) {

    if (req.user.rol !== "ROL_USUARIO") {
        return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
    }
  
    Citas.find({ idUsuario: req.user.sub }, (err, citaEncontrada) => {
  
      return res.status(200).send({ Usuario: citaEncontrada })
    })
  
}

// obtener citas del doctor
function obtenerCitasDoctor(req, res) {

    if (req.user.rol !== "ROL_DOCTOR") {
        return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
    }
  
    Citas.find({ doctor: req.user.sub }, (err, citaEncontrada) => {
  
      return res.status(200).send({ Usuario: citaEncontrada })
    })
  
}

// obtener citas por id doctor
function verCitasDoctor(req, res) {

  
    const doctor = req.params.doctor;
  
    Citas.find({ doctor: doctor },(err, citaEncontrada) => {
  
        return res.status(200).send({ Usuario: citaEncontrada });
      }
    );
  
}

// Ver cita por id
function buscarCitaId(req,res){

   
  
  
    var idCita = req.params.idCita;
  
    Citas.findById(idCita,(err, citaEncontrada)=>{
  
      if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
  
      if(!citaEncontrada) return res.status(404).send({mensaje:'Error al obtener los datos'});
  
      return res.send({Usuario: citaEncontrada})
  
    })    
}



module.exports = {
    agregarCita,
    obtenerCitasUser,
    verCitasDoctor,
    obtenerCitasDoctor,
    buscarCitaId
}