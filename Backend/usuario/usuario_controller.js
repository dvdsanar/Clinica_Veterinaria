const Usuario = require("./usuario_model.js");
const jwt = require("jsonwebtoken");

//GET DE Usuario //buscar por nombre del usuario
module.exports.traerUsuario = async (req, res) => {
  try {
    const lista = await Usuario.findAll({
      where: {
        nombre: req.query.nombre,
      },
    });
    res.json(lista);
  } catch (error) {
    res.json(error + "error");
  }
};

//POST DE Usuario
module.exports.crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = {
      nombre: req.body.nombre,
      email: req.body.email,
      contraseña: req.body.contraseña,
      rol: "paciente",
    };

    const usuarioCreado = await Usuario.create(nuevoUsuario);
    res.status(201).json(usuarioCreado);
  } catch (error) {
    res.json(error + "error");
  }
};

module.exports.login = async (req, res) => {
  try {
    const buscarUsuario = await Usuario.findOne({
      where: { email: req.body.email, contraseña: req.body.contraseña },
    });

    if (buscarUsuario != null) {
      const ficha = jwt.sign(
        { rol: buscarUsuario.rol, id: buscarUsuario.id },
        process.env.JWT_KEY
      );

      res.json(ficha);
    } else {
      res.status(401).send("Usuario no encontrado");
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports.logout = async (req, res) => {
  try {
    const buscarUsuario = await Usuario.findOne({
      where: { email: req.body.email, contraseña: req.body.contraseña },
    });

    if (buscarUsuario != null) {
      res.json("Se ha cerrado la sesion");
    } else {
      res.status(401).send("Usuario incorrecto");
    }
  } catch (error) {
    res.json(error + "error");
  }
};

// patch
module.exports.editarUsuario = async (req, res) => {
  try {
    await Usuario.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json("Usuario editado");
  } catch (error) {
    res.json(error + "error");
  }
};

//borrar usuario
module.exports.borrarUsuario = async (req, res) => {
  try {
    await Usuario.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.json("Usuario Borrado");
  } catch (error) {
    res.json(error + "error");
  }
};

module.exports.crearAdmin = async (req, res) => {
  try {
    const nuevoAdmin = {
      nombre: req.body.nombre,
      email: req.body.email,
      contraseña: req.body.contraseña,
      rol: req.body.rol,
    };

    const adminCreado = await Usuario.create(nuevoAdmin);
    res.status(201).json(adminCreado);
  } catch (error) {
    res.json(error + "error");
  }
};
