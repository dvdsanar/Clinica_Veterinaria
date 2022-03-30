const sequelize = require("sequelize");
const express = require("express");
const router = express.Router();
const controller = require("./paciente_controller.js");
const verificacion = require("../config/middlewares.js");

router.get("/", verificacion(), controller.infoPaciente);
router.post("/", verificacion(), controller.crearPaciente);
router.patch("/:id", verificacion(), controller.modificarPaciente);
router.delete("/", verificacion("admin"), controller.bajaPaciente);

module.exports = router;
