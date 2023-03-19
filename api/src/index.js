const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const chance = require("chance").Chance();

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const data = require("./notas.json");
const notasResponse = require("./notasResponse.json");
const ferran = require("./ferran.json");
const carlos = require("./carlos.json");
const matricula = require("./matricula.json");

const loginUser = {
  tokenId: chance.guid(),
  name: chance.name(),
  lastName: chance.last(),
  email: chance.email({ domain: "addressapi.com" }),
  password: chance.string({ length: 10 }),
};

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
app.route("/expediente/fb").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Expediente Ferran",
    data: ferran,
  };

  res.send(response);
});
app.route("/expediente/cr").get(function (req, res) {
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
app.route("/asignatura/").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Notas procesadas",
    //Usar aqui los params
    data: data,
  };

  res.send(response);
});

//Todas las asignaturas
app.route("/notas/").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Notas originales",
    //Usar aqui los params
    data: notasResponse,
  };

  res.send(response);
});
//URLs por asignatura
app.route("/asignatura/75.678").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75678",
    //Debo recorrer el array y buscar la asignatura del codigo que he recibido
    data: data[75678],
  };

  res.send(response);
});
app.route("/asignatura/75.588").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75588",
    //Debo recorrer el array y buscar la asignatura del codigo que he recibido
    data: data[75588],
  };

  res.send(response);
});
app.route("/asignatura/MINMUL4").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura MINMUL4",
    data: data["MINMUL4"],
  };

  res.send(response);
});
app.route("/asignatura/75.587").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75587",
    //Debo recorrer el array y buscar la asignatura del codigo que he recibido
    data: data[75587],
  };

  res.send(response);
});
app.route("/asignatura/75.589").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75589",
    //Debo recorrer el array y buscar la asignatura del codigo que he recibido
    data: data[75589],
  };

  res.send(response);
});
app.route("/asignatura/75.572").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75572",
    data: data[75572],
  };

  res.send(response);
});
app.route("/asignatura/75.575").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75575",
    data: data[75575],
  };

  res.send(response);
});
app.route("/asignatura/75.582").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75582",
    data: data[75582],
  };

  res.send(response);
});
app.route("/asignatura/75.613").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75613",
    data: data[75613],
  };

  res.send(response);
});
app.route("/asignatura/75.566").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75566",
    data: data[75566],
  };

  res.send(response);
});
app.route("/asignatura/75.585").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75585",
    data: data[75585],
  };

  res.send(response);
});
app.route("/asignatura/75.586").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75586",
    data: data[75586],
  };

  res.send(response);
});
app.route("/asignatura/75.567").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75567",
    data: data[75567],
  };

  res.send(response);
});
app.route("/asignatura/75.569").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75569",
    data: data[75569],
  };

  res.send(response);
});
app.route("/asignatura/75.573").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75573",
    data: data[75573],
  };

  res.send(response);
});
app.route("/asignatura/75.593").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75593",
    data: data[75593],
  };

  res.send(response);
});
app.route("/asignatura/75.564").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75564",
    data: data[75564],
  };

  res.send(response);
});
app.route("/asignatura/75.590").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75590",
    data: data[75590],
  };

  res.send(response);
});
app.route("/asignatura/75.611").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75611",
    data: data[75611],
  };

  res.send(response);
});
app.route("/asignatura/75.555").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75555",
    data: data[75555],
  };

  res.send(response);
});
app.route("/asignatura/75.558").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75558",
    data: data[75558],
  };

  res.send(response);
});
app.route("/asignatura/75.568").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75568",
    data: data[75568],
  };

  res.send(response);
});
app.route("/asignatura/75.571").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75571",
    data: data[75571],
  };

  res.send(response);
});
app.route("/asignatura/75.556").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75556",
    data: data[75556],
  };

  res.send(response);
});
app.route("/asignatura/75.565").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75565",
    data: data[75565],
  };

  res.send(response);
});
app.route("/asignatura/75.560").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75560",
    data: data[75560],
  };

  res.send(response);
});
app.route("/asignatura/75.561").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75561",
    data: data[75561],
  };

  res.send(response);
});
app.route("/asignatura/75.570").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75570",
    data: data[75570],
  };

  res.send(response);
});
app.route("/asignatura/75.615").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75615",
    data: data[75615],
  };

  res.send(response);
});
app.route("/asignatura/75.562").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75562",
    data: data[75562],
  };

  res.send(response);
});
app.route("/asignatura/75.563").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75563",
    data: data[75563],
  };

  res.send(response);
});
app.route("/asignatura/75.554").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75554",
    data: data[75554],
  };

  res.send(response);
});
app.route("/asignatura/75.557").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75557",
    data: data[75557],
  };

  res.send(response);
});
app.route("/asignatura/75.559").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75559",
    data: data[75559],
  };

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
  console.log("Login user created");
  console.log("email: " + loginUser.email);
  console.log("password: " + loginUser.password);
});
