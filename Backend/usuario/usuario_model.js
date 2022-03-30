const { Sequelize, DataTypes } = require("sequelize");
const conexion = require("../config/db_sequelize.js");

const Usuario = conexion.define("Usuarios", {
  nombre: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  rol: {
    type: DataTypes.STRING,
  },
  contraseña: {
    type: DataTypes.STRING,
  },
});

console.log(Usuario === conexion.models.Usuario); // true

try {
  Usuario.sync();
} catch (e) {
  console.log(error + " Este es el error");
}

module.exports = Usuario;
