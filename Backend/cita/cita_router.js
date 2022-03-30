const express = require("express");
const router = express.Router();
const controller = require("./cita_controller.js");
const verificacion = require("../config/middlewares.js");

router.get("/lista", verificacion(), controller.listaCita);
router.get("/", verificacion(), controller.filtrarCita);
router.post("/", verificacion(), controller.crearCita);
router.delete("/", verificacion(), controller.borrarCita);
router.patch("/:id", verificacion(), controller.modificarCita);

module.exports = router;
