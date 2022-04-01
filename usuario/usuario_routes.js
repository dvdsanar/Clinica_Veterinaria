const sequelize = require("sequelize");
const express = require("express");
const router = express.Router();
const controller = require("./usuario_controller.js");
const verificacion = require("../config/middlewares.js");

router.post("/admin", controller.crearAdmin);
router.get("/", controller.verUsuario);
router.post("/",  controller.crearUsuario); // Crear usuario
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.patch("/:id", controller.editarUsuario);
router.delete("/:id", controller.borrarUsuario);// Es necesario borrar las mascotas primero

module.exports = router;
