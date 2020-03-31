const express = require("express");
const routes = express.Router();
const mongoose = require('mongoose');
const ManagerController = require('../controllers/ManagerController');


//create manager
routes.post("/managers", ManagerController.create);

//get all managers
routes.get("/managers", ManagerController.getAll);

//get manager by id
routes.get("/managers/:managerId", ManagerController.getById);

module.exports = routes;