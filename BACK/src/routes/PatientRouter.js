const express = require("express");
const routes = express.Router();
const PatientController = require("../controllers/PatientController") 

//get all patients
routes.get("/patients", PatientController.getAll);

module.exports = routes;