/*****************************************
 * 1-INICIAMOS EXPRESS
 *****************************************/
const express = require("express");
const app = express();

/*****************************************
 * 2-SETEAMOS URLENCODED PARA CAPTURAR LOS DATOS DEL FORMULARIO
 *****************************************/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*****************************************
 * 3-INVOCAMOS DOTENV (para la ruta de las variables globales)
 *****************************************/
const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });

/*****************************************
 * 4-CONFIGURO EL DIRECTORIO PUBLIC (no hace falta dar la palabra resource para crear la ruta, se hace por convencion, podria estar vacio)
 *****************************************/
app.use("/resource", express.static("public"));
app.use("/resource", express.static(__dirname + "public"));
console.log(__dirname); //C:\xampp\htdocs\node\node-mysql-login-simple

/*****************************************
 * 5-ESTABLECEMOS EL MOTOR DE PLANTILLAS EJS
 *****************************************/
app.set("view engine", "ejs");

/*****************************************
 * 6-INVOCAMOS A BCRYPTJS PARA HACER EL HASH AL PASSWORD
 *****************************************/
const bcryptjs = require("bcryptjs");

/*****************************************
 * 7-VARIABLES DE SESSION
 *****************************************/
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

/*****************************************
 * 8-INVOCAMOS AL MODULO DE CONEXIÓN DE LA BD
 *****************************************/
const connection = require("./database/db");

/*****************************************
 * 9-ESTABLECIENDO LAS RUTAS(estan dentro de la carpeta public que defini en el paso 4)
 *****************************************/
/* app.get("/", (req, res) => {
  res.render("index");
});
 */
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

/*****************************************
 * 10-REGISTRACIÓN
 *****************************************/
//como usamos bcryptjs usamos async, await
app.post("/register", async (req, res) => {
  const user = req.body.userName;
  const name = req.body.nameName;
  const rol = req.body.rolName;
  const pass = req.body.passName;
  let passwordHash = await bcryptjs.hash(pass, 8);
  connection.query(
    "INSERT INTO users SET ?",
    {
      user: user,
      name: name,
      rol: rol,
      pass: passwordHash,
    },
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.render("register", {
          alert: true,
          alertTitle: "Registration",
          alertMessage: "!Successful Registration¡",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "",
        });
      }
    }
  );
});

/*****************************************
 * 11-AUTENTICACIÓN
 *****************************************/
app.post("/auth", async (req, res) => {
  const user = req.body.nameUser;
  const pass = req.body.namePassword;
  //let passwordHash = await bcryptjs.hash(pass, 8); //no hace falta
  if (user && pass) {
    connection.query(
      "SELECT * FROM users WHERE user = ?",
      [user],
      async (error, results) => {
        console.log(results[0]);
        if (
          results.length == 0 ||
          !(await bcryptjs.compare(pass, results[0].pass))
        ) {
          res.render("login", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario y/o password incorrectas",
            alertIcon: "error",
            showConfirmButton: true,
            timer: "",
            ruta: "login",
          });
        } else {
          req.session.loggedin = true;
          req.session.name = results[0].name;
          res.render("login", {
            alert: true,
            alertTitle: "!!Conexión exitosa¡¡",
            alertMessage: "Usuario logueado",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta: "",
          });
        }
      }
    );
  } else {
    res.render("login", {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Por favor Ingrese un usuario y/o una password",
      alertIcon: "warning",
      showConfirmButton: true,
      timer: "",
      ruta: "login",
    });
  }
});

/*****************************************
 * 12-AUTH PAGES
 *****************************************/
app.get("/", (req, res) => {
  if (req.session.loggedin) {
    res.render("index", {
      login: true,
      name: req.session.name, //OJO el name es de la varibale session q lo trae de la base de datos desde arriba "11-AUTENTICACIÓN"   req.session.name = results[0].name;
    });
  } else {
    res.render("index", {
      login: false,
      name: "you must log in",
    });
  }
});

/*****************************************
 * 13-LOGOUT
 *****************************************/
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

/*****************************************
 * SERVIDOR
 *****************************************/
app.listen(8000, (req, res) => console.log("SERVER UP"));
