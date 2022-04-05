const Mascota = require("../mascota/mascota_model.js");
const Usuario = require("../usuario/usuario_model.js");
const Relaciones = require("../config/relaciones.js");

//GET mascotas del usuario introducido por query params
module.exports.infoMascota = async (req, res) => {
  try {
    const lista = await Mascota.findAll({
      include: [{ model: Usuario }],
      where: {
        idUsuario: req.query.idUsuario,
      },
    });
    if (lista) {
      res.json(lista);
    } else {
      res.json("El Usuario no existe");
    }
  } catch (error) {
    console.log("error por catch" + error);
    res.json(error);
  }
};
module.exports.MascotasAll = async (req,res) => {
  try{
    const lista = await Mascota.findAll({
      include: [{model: Usuario}]
    })
    res.json(lista)
  }catch(error){
    console.log('Error por catch en el getAll de mascotas')
    res.json(error)
  }
}

// Get mascotas por el iD de Mascota
module.exports.mascotaPorId = async (req, res) => {
  try {
    const mascotaEncontrada = await Mascota.findByPk(req.params.id);

    if (mascotaEncontrada) {
      res.json(mascotaEncontrada);
    } else {
      res.json("La mascota no existe");
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
// Post mascota
module.exports.crearMascota = async (req, res) => {
  try {
    const nuevaMascota = await Mascota.create({
      nombre_mascota: req.body.nombre_mascota,
      peso: req.body.peso,
      fecha_nacimiento: req.body.fecha_nacimiento,
      idUsuario: req.body.idUsuario,
      doctor: req.body.doctor,
    });
    res.status(201).json(nuevaMascota);
  } catch (error) {
    res.json(error);
  }
};

module.exports.modificarMascota = async (req, res) => {
  try {
    await Mascota.update(req.body, { where: { id: req.params.id } });
    res.json("Mascota modificada con id " + req.params.id);
  } catch (error) {
    res.json(error);
  }
};

module.exports.borrarMascota = async (req, res) => {
  try {
    await Mascota.destroy({ where: { id: req.params.id } });
    res.json("Mascota borrada");
  } catch (error) {
    res.json(error);
  }
};
