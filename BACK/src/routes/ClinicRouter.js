const express = require("express");
const routes = express.Router();
const mongoose = require('mongoose');
const ClinicController = require('../controllers/ClinicController');
const authMiddleware = require("../middleware/Auth");

routes.use(authMiddleware);

//create clinic
routes.post("/clinics", ClinicController.create);

//upadate clinic by id
routes.put("/clinics/:clinicId", ClinicController.updateById);

//get all clinics
routes.get("/clinics", ClinicController.getAll);

//get clinic by id
routes.get("/clinics/:clinicId", ClinicController.getById);

module.exports = routes;