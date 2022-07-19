const Usuarios = require('../models/usuarios.model');

// Ver usuarios ROL DOCTOR
function verUsers(req, res) {

    if (req.user.rol !== "ROL_DOCTOR") {
        return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
    }
  
    Usuarios.find({rol: "ROL_USUARIO"},(err, usuariosEncontrados) => {
  
      if (err) return res.status(500).send({ mensaje: 'Error al buscar los usuarios' })
      if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'No existen hoteles' })
  
      return res.status(200).send({ Usuario: usuariosEncontrados })
  })
  
}

module.exports = {
    verUsers
}