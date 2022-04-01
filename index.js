const express = require("express");
const app = express();
const usRouter = require("./usuario/usuario_routes.js");
const dotenv = require("dotenv");
const mascotasRouter = require("./mascota/mascota_router.js");
const citaRouter = require("./cita/cita_router.js");
const cors = require('cors');

dotenv.config();
app.use(express.json());
app.use(cors())

app.listen(process.env.PORT, () => console.log("servidor levantado"));

app.use("/mascotas", mascotasRouter);
app.use("/usuarios", usRouter);
app.use("/citas", citaRouter);
