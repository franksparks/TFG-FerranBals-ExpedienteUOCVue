const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Hardcoded documents references
const carlosFile = require("./carlos.json");
const ferranFile = require("./ferran.json");
const minor = require("./minor.json");

//Object with all Ferran grades
const ferranMarks = require("./ferranMarks.json");

//Object with all Ferran enrollment
const enrollments = require("./enrollments.json");

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

//Ferran File
app.route("/file/ferran").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Ferran - File",
    data: ferranFile,
  };

  res.send(response);
});

//Ferran - Minor File
app.route("/file/minor").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Ferran - Minor file",
    data: minor,
  };

  res.send(response);
});

//Returns Ferran enrollments
app.route("/enrollments").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Ferran enrollments",
    data: enrollments,
  };

  res.send(response);
});

//Return the convos of a particular subject
app.route("/subject/").get(function (req, res) {
  if (!req.query.codAsignatura) {
    const response = {
      error: true,
      code: 400,
      message: "Please specify a subject",
    };
    return res.status(400).send(response);
  }

  const subject = ferranMarks.find(
    (obj) => obj.O[0].P.codAsignatura === req.query.codAsignatura
  );

  if (!subject) {
    const response = {
      error: true,
      code: 404,
      message: "Subject not found",
    };
    return res.status(404).send(response);
  }

  const subjectConvos = subject.O.map((item) => item.P);

  const response = {
    error: false,
    code: 200,
    message: "Information of the convos of a student of a particular subject",
    asignatura: subjectConvos,
  };
  res.status(200).send(response);
});

//Carlos File
app.route("/file/carlos").get(function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Carlos - File",
    data: carlosFile,
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
  console.log("Server started. Port: " + port);
});
