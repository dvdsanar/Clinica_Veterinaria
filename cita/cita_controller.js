const Citas = require("./cita_model.js");
const Mascota = require("../mascota/mascota_model.js");
const Relaciones = require("../config/relaciones.js");

const { Sequelize, DataTypes } = require("sequelize");
const Usuario = require("../usuario/usuario_model.js");
const {
  captureRejectionSymbol,
} = require("mysql2/typings/mysql/lib/Connection");

module.exports.listaCita = async (req, res) => {
  try {
    const lista = await Citas.findAll({
      include: [{ model: Mascota }],
      where: {
        idMascota: req.query.idMascota,
      },
    });
    res.json(lista);
  } catch (error) {
    res.json(error + "error");
  }
};

module.exports.citas = async (req, res) => {
  try {
    const lista = await Citas.findAll({
      where: {},
      include: [{ model: Mascota }],
    });
    res.json(lista);
  } catch (error) {
    console.log("Error por catch en el getAll de citas");
    res.json(error);
  }
};
//GET de las citas futuras pendientes
module.exports.filtrarCita = async (req, res) => {
  try {
    const lista = await Citas.findAll({
      where: {
        [Sequelize.Op.and]: {
          idMascota: req.query.idMascota,
          fechaDeVisita: { [Sequelize.Op.gte]: new Date() },
        },
      },
    });
    res.json(lista);
  } catch (error) {
    console.log(error + "error");
    res.json(error);
  }
};
//POST DE CITA
module.exports.crearCita = async (req, res) => {
  try {
    const nuevaCita = {
      descripcion: req.body.descripcion,
      fechaDeVisita: req.body.fechaDeVisita,
      idMascota: req.body.idMascota,
    };

    const citaCreada = await Citas.create(nuevaCita);
    res.status(201).json(citaCreada);
  } catch (error) {
    res.json(error);
  }
};
//Delete borrar cita por el id
module.exports.borrarCita = async (req, res) => {
  try {
    await Citas.destroy({ where: { id: req.body.id } });
    res.json("Cita borrada");
  } catch (error) {
    res.json(error);
  }
};
//Patch de las citas
module.exports.modificarCita = async (req, res) => {
  try {
    await Citas.update(req.body, { where: { id: req.params.id } });
    res.json("Cita modificada");
  } catch (error) {
    res.json(error);
  }
};
