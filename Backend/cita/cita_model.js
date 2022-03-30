const { Sequelize, DataTypes } = require("sequelize");
const conexion = require("../config/db_sequelize.js");

const Citas = conexion.define("Citas", {
  tratamiento: {
    type: DataTypes.STRING,
  },
  fechaDeVisita: {
    type: DataTypes.DATE,
  },
  idPaciente: {
    type: DataTypes.INTEGER,
  },
});

console.log(Citas === conexion.models.Citas); // true

try {
  Citas.sync();
} catch (e) {
  console.log(e + " Este es el error");
}

module.exports = Citas;
