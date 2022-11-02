const mysql = require("mysql");

/**********************************************
 * CONEXION A LA BASE DE DATOS
 **********************************************/
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

/**********************************************
 * COMPROBACIÓN DE LA CONEXION
 **********************************************/
connection.connect((error) => {
  if (error) {
    console.log("El error en kla conexión es: ", error);
  }
  console.log("¡CONECTADO A LA BASE DE DATOS!");
});

/**********************************************
 * EXPORTACIÓN DE LA CONEXIÓN
 **********************************************/
module.exports = connection;
