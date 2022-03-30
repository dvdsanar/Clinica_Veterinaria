const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const conexion = new Sequelize(
  process.env.HEROKU_NAME_DB,
  process.env.HEROKU_USER,
  process.env.HEROKU_PASS,
  {
    host: process.env.HEROKU_HOST,
    dialect: "mysql",
  }
);

const arranque = async () => {
  try {
    await conexion.authenticate();
    console.log("Conexión sequelize conectada 👌");
  } catch (error) {
    console.error("No se puede conectar a la base de datos:", error);
  }
};

arranque();
//exportando conexion
module.exports = conexion;
