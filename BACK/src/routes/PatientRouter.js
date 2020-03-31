const express = require("express");
const routes = express.Router();
const PatientController = require("../controllers/PatientController") 
const authMiddleware = require("../middleware/Auth");

routes.use(authMiddleware);

//create patient
routes.post("/patients", PatientController.create);

//delete patient by id
routes.delete("/patients/:patientId", PatientController.deleteById);

//upadate patient by id
routes.put("/patients/:patientId", PatientController.updateById);

//get all patients
routes.get("/patients", PatientController.getAll);

//get patient by id
routes.get("/patients/:patientId", PatientController.getById);

module.exports = routes;