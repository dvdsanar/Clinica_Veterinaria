const { Sequelize, DataTypes } = require("sequelize");
const conexion = require("../config/db_sequelize.js");

const Mascota = conexion.define("Mascotas", {
  nombre_mascota: {
    type: DataTypes.STRING,
    allowNull: false
  },
  peso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  doctor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
try {
  Mascota.sync();
} catch (e) {
  console.log(error + " Error al sincronizar modelo Mascota");
}

module.exports = Mascota;
