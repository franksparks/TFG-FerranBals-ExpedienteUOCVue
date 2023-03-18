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
const ferran = require("./ferran.json");
const carlos = require("./carlos.json");

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

app.route("/asignatura/75.573").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Asignatura 75573",
    data: data[75573],
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
