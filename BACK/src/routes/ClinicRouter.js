const express = require("express");
const routes = express.Router();
const ClinicController = require('../controllers/ClinicController');

//create clinic
routes.post("/clinics", ClinicController.create);

//authenticate clinic
routes.post("/clinics/authenticate", ClinicController.authenticate);

//upadate clinic by id
routes.put("/clinics/:clinicId", ClinicController.updateById);

//get all clinics
routes.get("/clinics", ClinicController.getAll);

//get clinic by id
routes.get("/clinics/:clinicId", ClinicController.getById);

module.exports = routes;