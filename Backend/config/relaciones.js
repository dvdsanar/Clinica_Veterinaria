const Usuario = require("../usuario/usuario_model.js");
const Citas = require("../cita/cita_model.js");
const Mascota = require("../mascota/mascota_model.js");

Usuario.hasMany(Mascota, { foreignKey: "idUsuario" });
Mascota.belongsTo(Usuario, { foreignKey: "idUsuario" });

Mascota.hasMany(Citas, { foreignKey: "idMascota" });
Citas.belongsTo(Mascota, { foreignKey: "idMascota" });

module.exports.Relaciones = { Usuario, Mascota, Citas };
