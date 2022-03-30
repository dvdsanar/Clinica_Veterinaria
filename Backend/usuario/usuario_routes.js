const sequelize = require("sequelize");
const express = require("express");
const router = express.Router();
const controller = require("./usuario_controller.js");
const verificacion = require("../config/middlewares.js");

router.post("/admin", verificacion("admin"), controller.crearAdmin);
router.get("/", verificacion(), controller.traerUsuario);
router.post("/", verificacion(), controller.crearUsuario);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.patch("/:id", verificacion("admin"), controller.editarUsuario);
router.delete("/", verificacion("admin"), controller.borrarUsuario);

module.exports = router;
