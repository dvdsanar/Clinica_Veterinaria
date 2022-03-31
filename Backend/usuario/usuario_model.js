const { Sequelize, DataTypes } = require("sequelize");
const conexion = require("../config/db_sequelize.js");

const Usuario = conexion.define("Usuarios", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    defaultValue: "cliente"
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  login: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});


try {
  Usuario.sync();
} catch (e) {
  console.log(error + " Error al sincronizar tabla Usuarios");
}

module.exports = Usuario;
