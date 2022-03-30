const Paciente = require("./paciente_model.js");
const Usuarios = require("../usuario/usuario_model.js");
const Relaciones = require("../config/relaciones.js");

//GET del Paciente
module.exports.infoPaciente = async (req, res) => {
  try {
    const lista = await Paciente.findAll({
      include: [{ model: Usuarios }],
      where: {
        idUsuario: req.query.idUsuario,
      },
    });
    res.json(lista);
  } catch (error) {
    console.log("error por cach" + error);
    res.json(error);
  }
};

module.exports.crearPaciente = async (req, res) => {
  try {
    const nuevoPaciente = {
      direccion: req.body.direccion,
      disponibilidad: req.body.disponibilidad,
      idUsuario: req.body.idUsuario,
      alergias: req.body.alergias,
    };

    const pacienteCreado = await Paciente.create(nuevoPaciente);
    res.status(201).json(pacienteCreado);
  } catch (error) {
    res.json(error);
  }
};

module.exports.modificarPaciente = async (req, res) => {
  try {
    await Paciente.update(req.body, { where: { id: req.params.id } });
    res.json("Paciente modificado");
  } catch (error) {
    res.json(error);
  }
};

module.exports.bajaPaciente = async (req, res) => {
  try {
    await Paciente.destroy({ where: { id: req.body.id } });
    res.json("Paciente borrado");
  } catch (error) {
    res.json(error);
  }
};
