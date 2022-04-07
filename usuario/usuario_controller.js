const Usuario = require("./usuario_model.js");
const jwt = require("jsonwebtoken");
const Mascota = require("../mascota/mascota_model.js");
const Relaciones = require("../config/relaciones.js");
// const hashear = require("../config/middlewares.js");
// const comprobarHash = require("../config/middlewares.js");
const middlewares = require("../config/middlewares.js");

//GET DE Usuario //buscar por nombre del usuario
module.exports.verUsuario = async (req, res) => {
  try {
    const usuarioEncontrado = await Usuario.findAll({
      include: [{ model: Mascota }],
      where: {
        id: req.query.id,
      },
    });
    if (usuarioEncontrado) {
      console.log(usuarioEncontrado);
      res.json(usuarioEncontrado);
    } else {
      res.status(404).json("El usuario seleccionado no existe");
    }
  } catch (error) {
    res.json(error + "error");
  }
};

//POST DE Usuario
module.exports.crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create({
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: req.body.email,
      contraseña: await middlewares.hashear(req.body.contraseña),
      telefono: req.body.telefono,
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.log(error);
    res.json(error + "error");
  }
};

module.exports.login = async (req, res) => {
  try {
    const usuarioEncontrado = await Usuario.findOne({
      where: { email: req.body.email },
    });

    if (usuarioEncontrado != null) {
      const comprobarHash = await middlewares.comprobarHash(
        req.body.contraseña,
        usuarioEncontrado.contraseña
      );

      if (comprobarHash) {
        const token = jwt.sign(
          { rol: usuarioEncontrado.rol, id: usuarioEncontrado.id },
          process.env.JWT_KEY
        );
        usuarioEncontrado.login = true;
        usuarioEncontrado.save();
        console.log(usuarioEncontrado);
        res.json({
          token: token,
          id: usuarioEncontrado.id,
          rol: usuarioEncontrado.rol,
        });
      } else {
        res.status(401).send("Usuario o contraseña incorrecto en el hash");
      }
    } else {
      res
        .status(401)
        .send("Usuario o contraseña incorrecto al encontrar al usuario");
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports.logout = async (req, res) => {
  try {
    const usuarioEncontrado = await Usuario.findOne({
      where: { email: req.body.email, contraseña: req.body.contraseña },
    });

    if (usuarioEncontrado != null) {
      usuarioEncontrado.login = false;
      await usuarioEncontrado.save();
      console.log(usuarioEncontrado);
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
    res.json("id Usuario editado: " + req.params.id);
  } catch (error) {
    res.json(error + "error");
  }
};

//borrar usuario
module.exports.borrarUsuario = async (req, res) => {
  try {
    await Usuario.destroy({
      where: {
        id: req.params.id,
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
