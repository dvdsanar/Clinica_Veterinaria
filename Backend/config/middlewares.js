//Importacion de libreria de gestion de token
const jwt = require("jsonwebtoken");
const Usuario = require("../usuario/usuario_model.js");
const bcrypt = require("bcrypt");

module.exports.hashear = async (contraseña) => {
  try {
    const hash = await bcrypt.hash(contraseña, 10);
    return hash;
  } catch (error) {
    console.log(error, "Error al hashear la contraseña");
  }
};

module.exports.comprobarHash = async (contraseñaVisible, contraseñaHasheada) => {
  try {
    const hashComprobado = await bcrypt.compare(
      contraseñaVisible,
      contraseñaHasheada
    );
    return hashComprobado;
  } catch (error) {
    console.log(error);
  }
};


//Middleware para la verificación a traves de un token
module.exports.verificacion = (comprobacionRol = null) => {
  return async (req, res, next) => {
    try {
      const token = jwt.verify(req.headers.token, process.env.JWT_KEY);

      const usuarioPasa = await Usuario.findOne({ where: { id: token.id } });
      if (
        (comprobacionRol == null || token.rol == comprobacionRol) &&
        usuarioPasa != null
      ) {
        next();
      } else {
        res.status(403).send("Tus credenciales no te permiten acceder aqui");
      }
    } catch (error) {
      res.status(401).send(error);
    }
  };
};

