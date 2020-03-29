const express = require("express");
const routes = express.Router();
const PatientController = require("../controllers/PatientController") 

//create patient
routes.post("/patients", PatientController.create);

//get all patients
routes.get("/patients", PatientController.getAll);

//get patient by id
routes.get("/patients/:patientId", PatientController.getById);

//delete patient by id
routes.delete("/patients/:patientId", PatientController.deleteById);

module.exports = routes;