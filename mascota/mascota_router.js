const sequelize = require("sequelize");
const express = require("express");
const router = express.Router();
const controller = require("./mascota_controller.js");
const verificacion = require("../config/middlewares.js");

router.get("/", controller.infoMascota); //GET mascotas del usuario introducido por query params
router.get("/allmascotas", controller.mascotasAll); // Get de todas las Mascotas
router.get("/:id", controller.mascotaPorId); // Get mascotas por iD Mascota
router.post("/", controller.crearMascota); // Crear una nueva mascota
router.patch("/:id", controller.modificarMascota); // Modificar mascota por id mascota
router.delete("/:id", controller.borrarMascota); // Borrar mascota

module.exports = router;
