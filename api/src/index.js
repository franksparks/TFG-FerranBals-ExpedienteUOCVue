const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const data = require("./notas.json");
const notasCompletas = require("./notasCompletas.json");
const ferran = require("./ferran.json");
const carlos = require("./carlos.json");
const matricula = require("./matricula.json");

let response = {
  error: false,
  code: 200,
  message: "",
};

app.get("/", function (req, res) {
  response = {
    error: true,
    code: 200,
    message: "API REST working.",
  };
  res.send(response);
});

//Expedientes completos
app.route("/expediente/ferran").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Expediente Ferran",
    data: ferran,
  };

  res.send(response);
});

app.route("/expediente/carlos").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Expediente Carlos",
    data: carlos,
  };

  res.send(response);
});

app.route("/matricula").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Obteniendo matriculas del alumno",
    data: matricula,
  };

  res.send(response);
});

//Todas las asignaturas
app.route("/asignaturas/").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Obtenemos la información de todas las asignaturas",
    //Usar aqui los params
    data: data,
  };

  res.send(response);
});

app.route("/notas/").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Obtenemos la información de todas las asignaturas",
    //Usar aqui los params
    data: notasCompletas,
  };

  res.send(response);
});

//Especificamos una asignatura
app.route("/asignatura/").get(function (req, res) {
  if (!req.query.codAsignatura) {
    console.log(req);
    response = {
      error: true,
      code: 400,
      message: "Especifica una asignatura",
    };
  } else {
    let asignatura = notasCompletas.filter((obj) => {
      return obj.O[0].P.codAsignatura === req.query.codAsignatura;
    });
    //Devuelve la lista de convos
    console.log(asignatura[0]);

    asignatura = asignatura[0].O[0].P;
    //let asignatura = notasCompletas[1].data.O[0].P;
    response = {
      error: false,
      code: 200,
      message: "Notas originales",
      //Usar aqui los params
      asignatura: asignatura,
    };
  }

  res.send(response);
});

app.use(function (req, res) {
  response = {
    error: true,
    codigo: 404,
    mensaje: "URL not found",
  };
  res.status(404).send(response);
});

app.listen(port, () => {
  console.log("Server started. Port 3000");
});
