const Usuarios = require("../usuario/usuario_model.js");
const Pacientes = require("../paciente/paciente_model.js");
const Citas = require("../cita/cita_model.js");

Pacientes.belongsTo(Usuarios, { foreignKey: "idUsuario" });

Pacientes.hasMany(Citas, { foreignKey: "idPaciente" });
Citas.belongsTo(Pacientes, { foreignKey: "idPaciente" });

module.exports.Relaciones = { Usuarios, Pacientes, Citas };
