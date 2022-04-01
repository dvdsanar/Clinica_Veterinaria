const { Sequelize, DataTypes } = require("sequelize");
const conexion = require("../config/db_sequelize.js");

const Citas = conexion.define("Citas", {
  descripcion: {
    type: DataTypes.STRING,
  },
  fechaDeVisita: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendiente'
  },
  idMascota: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});
try {
  Citas.sync();
} catch (e) {
  console.log(error + "Error al sincronizar tabla Citas");
}

module.exports = Citas;
