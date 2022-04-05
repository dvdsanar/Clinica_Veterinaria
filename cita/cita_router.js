const express = require("express");
const router = express.Router();
const controller = require("./cita_controller.js");
const verificacion = require("../config/middlewares.js");

router.get("/lista",  controller.listaCita);
router.get("/",  controller.filtrarCita);
router.get("/allcitas", controller.citas)
router.post("/",  controller.crearCita);
router.delete("/",  controller.borrarCita);
router.patch("/:id",  controller.modificarCita);

module.exports = router;
