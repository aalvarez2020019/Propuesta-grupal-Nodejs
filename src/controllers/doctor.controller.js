const Usuarios = require('../models/usuarios.model');
const Citas = require('../models/cita.model');
const Datos = require('../models/datos.model');



function agregarDatos (req,res){

    if (req.user.rol !== "ROL_DOCTOR") {
        return res.status(500).send({ mensaje: "Solo el doctor tiene permisos" });
    }
  
    let datosModel = new Datos();
    let params = req.body;
  
    datosModel.habitacion = params.habitacion;
    datosModel.sexo = params.sexo;
    datosModel.horario = params.horario;
    datosModel.especialidad = params.especialidad;
    datosModel.telefono = params.telefono;
    datosModel.doctor = req.user.sub;


    
  
    /* if (params.nombre == '' || params.descripcion == '' || params.hotel == ''){
  
        return res.status(500).send({mensaje:'No puede hacer la peticion con campos vacios'})
    } */
  
    Datos.findOne({habitacion: datosModel.habitacion}, (err, servicioEncontrado)=>{
  
       if (err) return res.status(500).send({mensaje:'Error al consultar el evento'})
        if (servicioEncontrado) return res.status(500).send({mensaje:'Ya esta ocupada la habitacion'})
  
        datosModel.save((err, datosGuardados)=>{

            if (err) return res.status(500).send({mensaje:'Error al guardar los datos'})
  
            if (!datosGuardados) return res.status(500).send({mensaje:'La peticion esta vacia'})
  
            return res.status(200).send({datosGuardados})
        })

    })
}


// Editar usuarios
function editarDatos(req, res) {

    var idUser = req.params.idDatos;
    var parametros = req.body;
  
    
    Datos.findByIdAndUpdate(idUser, parametros,{ new: true },(err, editarControl) => {
  
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
  
        if (!editarControl) return res.status(403).send({ mensaje: "Error al editar el control" });
  
        return res.status(200).send({ Usuario: editarControl });
  
      }
    );
}

// eliminar datos
function eliminarDatos(req, res){

    var idDatos = req.params.idDatos;
  
    Datos.findByIdAndDelete(idDatos, (err, citaEliminada) => {
  
      if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
      if(!citaEliminada) return res.status(404).send( { mensaje: "Error al eliminar"});
  
      return res.status(200).send({ Usuario: citaEliminada});
  })
  
}

// buscar por id datos
// Ver cita por id
function buscarDatosId(req,res){

    var idDatos = req.params.idDatos;
  
    Datos.findById(idDatos,(err, citaEncontrada)=>{
  
      if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
  
      if(!citaEncontrada) return res.status(404).send({mensaje:'Error al obtener los datos'});
  
      return res.send({Usuario: citaEncontrada})
  
    })    
}

// obtener datos del doctor
function obtenerDatosDoctor(req, res) {

    if (req.user.rol !== "ROL_DOCTOR") {
        return res.status(500).send({ mensaje: "Solo el doctor tiene permisos" });
    }

  
    Datos.find({ doctor: req.user.sub }, (err, citaEncontrada) => {
  
      return res.status(200).send({ Usuario: citaEncontrada })
    })
  
}

// ver citas por doctor
function datosDoctorId(req, res) {

  
    const doctor = req.params.doctor;
  
    Datos.find({ doctor: doctor },(err, citaEncontrada) => {
  
        return res.status(200).send({ Usuario: citaEncontrada });
      }
    );
  
}


// Ver usuarios ROL DOCTOR
function verUsers(req, res) {

    if (req.user.rol !== "ROL_DOCTOR") {
        return res.status(500).send({ mensaje: "Solo el doctor tiene permisos" });
    }
  
    Usuarios.find({rol: "ROL_USUARIO"},(err, usuariosEncontrados) => {
  
      if (err) return res.status(500).send({ mensaje: 'Error al buscar los usuarios' })
      if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'No existen hoteles' })
  
      return res.status(200).send({ Usuario: usuariosEncontrados })
  })
  
}

// ver citas del doctor

// obtener citas por id doctor
function citasDoctor(req, res) {

    if (req.user.rol !== "ROL_DOCTOR") {
        return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
    }
  
    Citas.find({ doctor: req.user.sub }, (err, citaEncontrada) => {
  
        return res.status(200).send({ Usuario: citaEncontrada })
      })
  
}


module.exports = {
    verUsers,
    citasDoctor,
    agregarDatos,
    editarDatos,
    eliminarDatos,
    buscarDatosId,
    obtenerDatosDoctor,
    datosDoctorId
}